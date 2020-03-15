import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsSearch from "../components/PostsSearch";


const SearchPage = () => {
    return (
        <Layout render={
            ({ scrollValue, height }) => {
                return (
                    <>
                        <SEO title="Home" />
                        <PostsSearch scrollValue={scrollValue} height={height} />
                    </>
                )
            }}>

        </Layout>
    )
}

export default SearchPage;