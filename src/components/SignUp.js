import React from "react"
import { navigate } from "gatsby"
import { signUp } from "../services/auth"

const SignUp = (props) => {
  const [user, setUser] = React.useState({});

  const handleUpdate = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault()

    signUp(
      user
    )
      .then(() => {
        alert('sign up successful, you may now login using your credentials')
        navigate(`/app/profile`)
      })
      .catch(e => alert(`Error signing up: ${e.message}`))
  }

  return (
    <>
      <h1>Sign up</h1>
      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event)
        }}
      >

        <label>
          Email
            <input type="text" name="email" onChange={handleUpdate} />
        </label>
        <br />

        <label>
          First Name
            <input type="text" name="first_name" onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Last Name
            <input type="text" name="last_name" onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Username
            <input type="text" name="username" onChange={handleUpdate} />
        </label>
        <br />

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
export default SignUp;