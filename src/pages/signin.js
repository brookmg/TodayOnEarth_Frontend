import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SignIn from "../components/SignIn"
import { isBrowser } from "../utils"

const SignInPage = () => {
  // reset url to remove params
  isBrowser() && window.history.replaceState({}, document.title, "/signin")

  return (
    <Layout>
      <SEO title="Home" />

      <SignIn />

      <Link to="/page-2/">Go to page 2</Link>
      <br />
      <Link to="/mobile/">Go to mobile site</Link>
    </Layout>
  )
}

export default SignInPage
