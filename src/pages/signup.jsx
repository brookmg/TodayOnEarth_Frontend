/**
 * This page provides a UI for signing up a user.
 * 
 * Currently supported 3rd party auth methods are: 
 *          Google, Facebook, Twitter, GitHub, LinkedIn, Telegram
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL";
import SignUp from "../components/SignUp";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";
import { isBrowser } from "../utils";


const SignUpPage = withQueryParsedURL(
  withRunTimeLoaded(
    ({ queryParsedURL }) => {
      const data = JSON.parse(queryParsedURL.data || `{}`).potential_user || {}

      // reset url to remove params
      isBrowser() && window.history.replaceState({}, document.title, `/signup`)

      return (
        <Layout>
          <SEO title={`Sign Up`} />

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
    }
  )
)

export default SignUpPage
