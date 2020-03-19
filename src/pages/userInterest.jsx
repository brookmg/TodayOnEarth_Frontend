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
                    ({ scrollValue, height }) => {
                        return (
                            <>
                                <SEO title={`Posts sorted by user interest`} />
                                <PostsByUserInterest scrollValue={scrollValue} height={height} />
                            </>
                        )
                    }}>
            </Layout>
        )
    }
)

export default UserInterestPage
