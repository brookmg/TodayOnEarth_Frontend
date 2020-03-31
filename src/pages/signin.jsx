/**
 * This page provides a UI for signing in a user.
 * 
 * Currently supported 3rd party auth methods are: 
 *          Google, Facebook, Twitter, GitHub, LinkedIn, Telegram
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SignIn from "../components/SignIn";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";
import { isBrowser } from "../utils";


const SignInPage = withRunTimeLoaded(
  () => {
    // reset url to remove params
    isBrowser() && window.history.replaceState({}, document.title, `/signin`)

    return (
      <Layout>
        <SEO title={`Sign In`} />

        <SignIn />

      </Layout>
    )
  }
)

export default SignInPage
