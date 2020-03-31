/**
 * This page shows the newest posts first. 
 * 
 * This page is also connected to a gql subscription for real-time
 * updates
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsLatest from "../components/PostsLatest";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const LatestPage = withRunTimeLoaded(
  () => {
    return (
      <Layout render={
        (isBottomReached) => {
          return (
            <>
              <SEO title={`Latest Posts`} />
              <PostsLatest isBottomReached={isBottomReached} />
            </>
          )
        }}>

      </Layout>
    )
  }
)

export default LatestPage
