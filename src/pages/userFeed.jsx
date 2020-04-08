/**
 * This page provides posts made by the providers the user selected
 * 
 * Note: User needs to be logged in for this page to work as intended
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsFromUserProvider from "../components/PostsFromUserProvider";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const UserFeedPage = withRunTimeLoaded(
    () => {
        return (
            <Layout
                render={
                    (isBottomReached) => {
                        return (
                            <>
                                <SEO title={`User Feed`} />
                                <PostsFromUserProvider isBottomReached={isBottomReached} />
                            </>
                        )
                    }}>
            </Layout>
        )
    }
)

export default UserFeedPage
