/**
 * This page shows posts that were made today.
 *  
 * On the desktop UI, it will have a keywords section that will show the buzz words that
 * have occurred frequently today, this also supports semantic meaning but might take longer to process
 */
import React from "react";
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
