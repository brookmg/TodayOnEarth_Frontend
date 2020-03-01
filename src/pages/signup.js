import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL"
import { signUp } from "../services/auth"
import AuthContext from "../components/Contexts/AuthContext"
import { isBrowser } from "../utils"
import ButtonSignInWith from "../components/UIElements/ButtonSignInWith"
import Margin from "../components/CompoundComponents/Margin"
import { FormInput, Button } from "shards-react"
import AnchorButton from "../components/UIElements/AnchorButton"

const SignUp = ({ email, first_name, last_name, username }) => {
  const auth = React.useContext(AuthContext)
  const [user, setUser] = React.useState({ email, first_name, last_name, username });

  const handleUpdate = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault()

    signUp(
      user
    )
      .then(() => auth.refreshActiveUser(
        () => navigate(`/app/profile`)
      ))
      .catch(e => alert(`Error signing up: ${e.message}`))
  }
  const handleSignIn = () => { navigate(`/app/login`) }

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
          Email<br />
          <FormInput name="email" value={user.email} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          First Name<br />
          <FormInput name="first_name" value={user.first_name} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Last Name<br />
          <FormInput name="last_name" value={user.last_name} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Username<br />
          <FormInput name="username" value={user.username} onChange={handleUpdate} />
        </label>
        <br />

        <label>
          Password<br />
          <FormInput
            type="password"
            name="password"
            onChange={handleUpdate}
          />
        </label>
        <br />

        <Margin right="0.5em">
          <ButtonSignInWith
            url={"http://localhost:3400/auth/twitter"}
            borderColor={"#49a0e9"}
            backgroundColor={"#fff"}
            color={"#49a0e9"}
            imgSrc={`https://www.brandeps.com/logo-download/T/Twitter-logo-vector-01.svg`}
            value="Fill with Twitter"
          />

          <ButtonSignInWith
            url={"http://localhost:3400/auth/facebook"}
            borderColor={"#3b5998"}
            backgroundColor={"#3b5998"}
            color={"#fff"}
            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/4/4d/F_icon_reversed.svg`}
            value="Fill with Facebook"
          />

          <ButtonSignInWith
            url={"http://localhost:3400/auth/google"}
            borderColor={"#eee"}
            backgroundColor={"#fff"}
            color={"#000"}
            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/5/53/Google_"G"_Logo.svg`}
            value="Fill with Google"
          />
        </Margin>

        <br />
        <Margin vertical="1em" right="1em">
          <Button theme="success" type="submit" >Sign Up</Button><br />
          <AnchorButton url="/app/login" onClick={handleSignIn}>Already have an account? Log in here</AnchorButton>
        </Margin>
      </form>

    </>
  )
}

const SignUpPage = withQueryParsedURL((props) => {
  const queryParsedURL = props.queryParsedURL

  const data = JSON.parse(queryParsedURL.data || `{}`).potential_user || {}

  // reset url to remove params
  isBrowser() && window.history.replaceState({}, document.title, "/signup")

  return (
    <Layout>
      <SEO title="Home" />

      <SignUp
        email={data.email}
        first_name={data.first_name}
        last_name={data.last_name}
        username={data.username}
      />

    </Layout>
  )
})

export default SignUpPage
