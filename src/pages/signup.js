import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL"

import { signUp } from "../services/auth"

const SignUp = ({ email, first_name, last_name, username }) => {
  const [user, setUser] = React.useState({ email, first_name, last_name, username });

  const handleUpdate = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault()

    signUp(
      user
    )
      .then(() => {
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
            <input type="text" name="email" value={user.email} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          First Name
            <input type="text" name="first_name" value={user.first_name} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Last Name
            <input type="text" name="last_name" value={user.last_name} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Username
            <input type="text" name="username" value={user.username} onChange={handleUpdate} />
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
        <br />

        <a href="http://localhost:3400/auth/twitter">
          <input
            type="button"
            value="Fill with Twitter"
          />
        </a>
        <a href="http://localhost:3400/auth/facebook">
          <input
            type="button"
            value="Fill with Facebook"
          />
        </a>
        <a href="http://localhost:3400/auth/google">
          <input
            type="button"
            value="Fill with Google"
          />
        </a>

        <br />
        <input type="submit" value="Sign Up" />

      </form>
    </>
  )
}

const SignUpPage = withQueryParsedURL((props) => {
  const queryParsedURL = props.queryParsedURL

  const data = JSON.parse(queryParsedURL.data || `{}`).potential_user || {}

  // reset url to remove params
  window.history.replaceState({}, document.title, "/signup")

  return (
    <Layout>
      <SEO title="Home" />

      <SignUp
        email={data.email}
        first_name={data.first_name}
        last_name={data.last_name}
        username={data.username}
      />

      <Link to="/page-2/">Go to page 2</Link>
      <br />
      <Link to="/mobile/">Go to mobile site</Link>
    </Layout>
  )
})

export default SignUpPage
