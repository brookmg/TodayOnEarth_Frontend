/**
 * This page shows posts that are sorted by most interesting first
 * 
 * Note: User needs to be logged in and interests should be filled in for
 * this page to work as intended
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsByUserInterest from "../components/PostsByUserInterest";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const UserInterestPage = withRunTimeLoaded(
    () => {
        return (
            <Layout
                render={
                    (isBottomReached) => {
                        return (
                            <>
                                <SEO title={`Posts sorted by user interest`} />
                                <PostsByUserInterest isBottomReached={isBottomReached} />
                            </>
                        )
                    }}>
            </Layout>
        )
    }
)

export default UserInterestPage
