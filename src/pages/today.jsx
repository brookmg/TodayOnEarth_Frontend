import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import SEO from "../components/seo";
import TrendingKeywords from "../components/TrendingKeywords";
import PostsTrendingToday from "../components/PostsTrendingToday";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const TodayPage = withRunTimeLoaded(
    () => {
        return (
            <Layout
                rightSideDesktopComponent={(
                    <TrendingKeywords />
                )}
                render={
                    ({ scrollValue, height }) => {
                        return (
                            <>
                                <SEO title={`Todays Posts`} />
                                <PostsTrendingToday scrollValue={scrollValue} height={height} />
                            </>
                        )
                    }}>
            </Layout>
        )
    }
)

export default TodayPage
