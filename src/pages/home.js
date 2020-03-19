import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsFromUserProvider from "../components/PostsFromUserProvider";


const HomePage = () => {
    return (
        <Layout
            render={
                ({ scrollValue, height }) => {
                    return (
                        <>
                            <SEO title={`Home`} />
                            <PostsFromUserProvider scrollValue={scrollValue} height={height} />
                        </>
                    )
                }}>
        </Layout>
    )
}

export default HomePage
