import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL"
import { isBrowser } from "../utils"
import AnimatedLink from "../components/UIElements/AnimatedLink"

const AuthErrorPage = withQueryParsedURL(({ queryParsedURL }) => {
  // reset url to remove params
  isBrowser() && window.history.replaceState({}, document.title, "/signup")

  return (
    <Layout>
      <SEO title="Home" />
      <h1>There was an error with authentication</h1>
      <pre>
        Error message:
        {queryParsedURL.error}
      </pre>

      <p><AnimatedLink to="/signup">Sign Up</AnimatedLink> | <AnimatedLink to="/app/login">Log In</AnimatedLink></p>

      <AnimatedLink to="/page-2/">Go to page 2</AnimatedLink>
      <br />
      <AnimatedLink to="/mobile/">Go to mobile site</AnimatedLink>
    </Layout>
  )
}
)

export default AuthErrorPage
