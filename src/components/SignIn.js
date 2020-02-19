import React from "react"
import { navigate } from "gatsby"
import { handleSignIn, isLoggedIn } from "../services/auth"
import AuthContext from "./Contexts/AuthContext"

const SignIn = (props) => {
  const auth = React.useContext(AuthContext)
  const [user, setUser] = React.useState({})

  const handleUpdate = event =>
    setUser({ ...user, [event.target.name]: event.target.value, })

  const handleSubmit = event => {
    event.preventDefault()
    handleSignIn(user)
      .then(() => auth.refreshActiveUser(
        () => navigate(`/app/profile`)
      ))
      .catch(e => alert(e.message))
  }

  if (isLoggedIn()) {
    navigate(`/app/profile`)
  }


  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => handleSubmit(event)
        }
      >
        <label>
          Email
            <input type="text" name="email" onChange={handleUpdate} />
        </label>
        <label>
          Password
            <input
            type="password"
            name="password"
            onChange={handleUpdate}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>

      <a href="http://localhost:3400/auth/twitter">
        <input
          type="button"
          value="Sign in with Twitter"
        />
      </a>
      <a href="http://localhost:3400/auth/facebook">
        <input
          type="button"
          value="Sign in with Facebook"
        />
      </a>
      <a href="http://localhost:3400/auth/google">
        <input
          type="button"
          value="Sign in with Google"
        />
      </a>

    </>
  )

}
export default SignIn