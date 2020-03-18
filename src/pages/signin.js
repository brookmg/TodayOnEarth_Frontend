import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SignIn from "../components/SignIn"
import { isBrowser } from "../utils"

const SignInPage = () => {
  // reset url to remove params
  isBrowser() && window.history.replaceState({}, document.title, `/signin`)

  return (
    <Layout>
      <SEO title={`Sign In`} />

      <SignIn />

    </Layout>
  )
}

export default SignInPage
