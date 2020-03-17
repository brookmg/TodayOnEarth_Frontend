import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsByUserInterest from "../components/PostsByUserInterest";


const UserInterestPage = () => {
    return (
        <Layout
            render={
                ({ scrollValue, height }) => {
                    return (
                        <>
                            <SEO title="Home" />
                            <PostsByUserInterest scrollValue={scrollValue} height={height} />
                        </>
                    )
                }}>
        </Layout>
    )
}

export default UserInterestPage