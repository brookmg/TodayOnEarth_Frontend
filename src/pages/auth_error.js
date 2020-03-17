import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL";
import AuthError from "../components/AuthError";
import { isBrowser } from "../utils";


const AuthErrorPage = withQueryParsedURL(({ queryParsedURL }) => {
  // reset url to remove params
  isBrowser() && window.history.replaceState({}, document.title, "/auth_error")

  return (
    <Layout>
      <SEO title="Auth: Error" />
      <AuthError error={queryParsedURL.error}></AuthError>
    </Layout>
  )
}
)

export default AuthErrorPage
