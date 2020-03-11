import React from "react"
import { navigate } from "gatsby"
import { handleSignIn, isLoggedIn } from "../services/auth"
import AuthContext from "./Contexts/AuthContext"
import Margin from "./CompoundComponents/Margin"
import { Button, FormInput } from "shards-react"
import AnchorButton from "./UIElements/AnchorButton"
import ButtonSignInWith from "./UIElements/ButtonSignInWith"
import ButtonSuccess from "./UIElements/ButtonSuccess"


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
  const handleSignUp = () => { navigate(`/signup`) }

  if (isLoggedIn()) {
    navigate(`/app/profile`)
  }

  const authEndpoint = process.env.GATSBY_AUTH_ENDPOINT

  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => handleSubmit(event)
        }
      >
        <Margin vertical="0.5em" horizontal="0.5em">

          <FormInput placeholder="Email" name="email" onChange={handleUpdate} />

          <FormInput
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleUpdate}
          />
          <ButtonSuccess type="submit"> Log In </ButtonSuccess>
          <AnchorButton url="/signup" onClick={handleSignUp}>Dont have an account? Sign up here</AnchorButton>

        </Margin>
      </form>
      <div>
        <Margin horizontal="0.5em">
          <ButtonSignInWith
            url={`${authEndpoint}/twitter`}
            borderColor={"#49a0e9"}
            backgroundColor={"#fff"}
            color={"#49a0e9"}
            imgSrc={`https://abs.twimg.com/favicons/twitter.ico`}
            value="Sign in with Twitter"
          />

          <ButtonSignInWith
            url={`${authEndpoint}/facebook`}
            borderColor={"#3b5998"}
            backgroundColor={"#3b5998"}
            color={"#fff"}
            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/4/4d/F_icon_reversed.svg`}
            value="Sign in with Facebook"
          />

          <ButtonSignInWith
            url={`${authEndpoint}/google`}
            borderColor={"#eee"}
            backgroundColor={"#fff"}
            color={"#000"}
            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/5/53/Google_"G"_Logo.svg`}
            value="Sign in with Google"
          />
          <ButtonSignInWith
            url={`${authEndpoint}/github`}
            borderColor={"#24292e"}
            backgroundColor={"#fff"}
            color={"#24292e"}
            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg`}
            value="Sign in with GitHub"
          />

          <ButtonSignInWith
            url={`${authEndpoint}/linkedin`}
            borderColor={"#3577b5"}
            backgroundColor={"#3577b5"}
            color={"#fff"}
            imgSrc={`https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico`}
            value="Sign in with LinkedIn"
          />
        </Margin>
      </div>
    </>
  )

}
export default SignIn