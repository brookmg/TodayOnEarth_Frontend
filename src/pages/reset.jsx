/**
 * User is redirected to this page when password reset link has been clicked from their email
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";
import PasswordReset from "../components/PasswordReset";
import { isBrowser } from "../utils";


const PasswordResetPage = withQueryParsedURL(
    withRunTimeLoaded(
        ({ queryParsedURL }) => {
            // reset url to remove params
            isBrowser() && window.history.replaceState({}, document.title, `/reset`)

            return (
                <Layout>
                    <SEO title={`Password Reset`} />
                    <PasswordReset token={queryParsedURL.token}></PasswordReset>
                </Layout>
            )
        }
    )
)

export default PasswordResetPage
