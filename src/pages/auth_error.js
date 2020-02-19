import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL"
import { isBrowser } from "../utils"

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

      <p><Link to="/signup">Sign Up</Link> | <Link to="/app/login">Log In</Link></p>

      <Link to="/page-2/">Go to page 2</Link>
      <br />
      <Link to="/mobile/">Go to mobile site</Link>
    </Layout>
  )
}
)

export default AuthErrorPage
