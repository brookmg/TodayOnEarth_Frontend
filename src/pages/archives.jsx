/**
 * This page provides posts of a single provider
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsByProvider from "../components/PostsByProvider";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const ProviderPage = withRunTimeLoaded(
    () => {
        return (
            <Layout
                render={
                    (isBottomReached) => {
                        return (
                            <>
                                <SEO title={`Posts by provider`} />
                                <PostsByProvider isBottomReached={isBottomReached} />
                            </>
                        )
                    }}>
            </Layout>
        )
    }
)

export default ProviderPage
