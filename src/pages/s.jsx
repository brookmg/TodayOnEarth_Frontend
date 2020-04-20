/**
 * This page allows users to search for posts
 * 
 * Note: This is a dynamic page
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsSearch from "../components/PostsSearch";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const SearchPage = withRunTimeLoaded(
    () => {
        return (
            <Layout render={
                (isBottomReached) => {
                    return (
                        <>
                            <SEO title={`Search Post`} />
                            <PostsSearch isBottomReached={isBottomReached} />
                        </>
                    )
                }}>

            </Layout>
        )
    }
)

export default SearchPage;