import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TrendingKeywords from "../components/TrendingKeywords";
import PostsTrendingToday from "../components/PostsTrendingToday";
import styled from "styled-components";


const StyledDiv = styled.div`
    flex: 1;
    padding-top: 15em;
    height: 100vh;
    overflow: auto;
`

const TodayPage = () => {
    return (
        <Layout
            rightSideDesktopComponent={(
                <StyledDiv>
                    <TrendingKeywords />
                </StyledDiv>
            )}
            render={
                ({ scrollValue, height }) => {
                    return (
                        <>
                            <SEO title="Todays Posts" />
                            <PostsTrendingToday scrollValue={scrollValue} height={height} />
                        </>
                    )
                }}>
        </Layout>
    )
}

export default TodayPage
