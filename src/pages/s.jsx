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
                ({ scrollValue, height }) => {
                    return (
                        <>
                            <SEO title={`Search Post`} />
                            <PostsSearch scrollValue={scrollValue} height={height} />
                        </>
                    )
                }}>

            </Layout>
        )
    }
)

export default SearchPage;