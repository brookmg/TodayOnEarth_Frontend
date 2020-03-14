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
import { FormInput } from "shards-react"
import AnchorButton from "../components/UIElements/AnchorButton"
import ButtonSuccess from "../components/UIElements/ButtonSuccess"
import ScreenSizeContext from "../components/Contexts/ScreenSizeContext"


const SignUp = ({ email, first_name, last_name, username, google_id, facebook_id, twitter_id, github_id, linkedin_id, telegram_id }) => {
  const isDesktopOrLaptop = React.useContext(ScreenSizeContext).isDesktopOrLaptop
  
  const auth = React.useContext(AuthContext)
  const [user, setUser] = React.useState({ email, first_name, last_name, username, google_id, facebook_id, twitter_id, github_id, linkedin_id, telegram_id });

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

  const authEndpoint = process.env.GATSBY_AUTH_ENDPOINT

  return (
    <>
      <h1>Sign up</h1>
      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event)
        }}
      >
        <div style={{ display: 'flex', flexDirection: isDesktopOrLaptop ? 'row' : 'column' }}>
          <div style={{ flex: 1 }}>
            <Margin horizontal="0.5em" vertical="0.25em">
              <ButtonSignInWith
                url={`${authEndpoint}/twitter`}
                borderColor={"#49a0e9"}
                backgroundColor={"#fff"}
                color={"#49a0e9"}
                imgSrc={`https://abs.twimg.com/favicons/twitter.ico`}
                value="Fill with Twitter"
              />

              <ButtonSignInWith
                url={`${authEndpoint}/facebook`}
                borderColor={"#3b5998"}
                backgroundColor={"#3b5998"}
                color={"#fff"}
                imgSrc={`https://upload.wikimedia.org/wikipedia/commons/4/4d/F_icon_reversed.svg`}
                value="Fill with Facebook"
              />

              <ButtonSignInWith
                url={`${authEndpoint}/google`}
                borderColor={"#eee"}
                backgroundColor={"#fff"}
                color={"#000"}
                imgSrc={`https://upload.wikimedia.org/wikipedia/commons/5/53/Google_"G"_Logo.svg`}
                value="Fill with Google"
              />

              <ButtonSignInWith
                url={`${authEndpoint}/github`}
                borderColor={"#24292e"}
                backgroundColor={"#fff"}
                color={"#24292e"}
                imgSrc={`https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg`}
                value="Fill with GitHub"
              />

              <ButtonSignInWith
                url={`${authEndpoint}/linkedin`}
                borderColor={"#3577b5"}
                backgroundColor={"#3577b5"}
                color={"#fff"}
                imgSrc={`https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico`}
                value="Fill with LinkedIn"
              />
            </Margin>
          </div>
          <div style={{ flex: 1 }}>
            <div>
              Email
              <FormInput name="email" value={user.email} onChange={handleUpdate} />
            </div>
            

            <div>
              First Name
              <FormInput name="first_name" value={user.first_name} onChange={handleUpdate} />
            </div>
            

            <div>
              Last Name
              <FormInput name="last_name" value={user.last_name} onChange={handleUpdate} />
            </div>
            

            <div>
              Username
              <FormInput name="username" value={user.username} onChange={handleUpdate} />
            </div>
            

            <div>
              Password
              <FormInput
                type="password"
                name="password"
                onChange={handleUpdate}
              />
            </div>
            
          </div>
        </div>

        
        <Margin vertical="1em" right="1em">
          <ButtonSuccess type="submit" >Sign Up</ButtonSuccess><br />
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
        google_id={data.google_id}
        facebook_id={data.facebook_id}
        twitter_id={data.twitter_id}
        github_id={data.github_id}
        linkedin_id={data.linkedin_id}
        telegram_id={data.telegram_id}
      />

    </Layout>
  )
})

export default SignUpPage
