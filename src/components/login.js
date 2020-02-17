import React from "react"
import { navigate } from "gatsby"
import { handleSignIn, isLoggedIn, getUser } from "../services/auth"

const Login = (props) => {
  const [user, setUser] = React.useState({})

  const handleUpdate = event =>
    setUser({ ...user, [event.target.name]: event.target.value, })

  const handleSubmit = event => {
    event.preventDefault()
    handleSignIn(user)
      .then(() => navigate(`/app/profile`))
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
    </>
  )

}
export default Login