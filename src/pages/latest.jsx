import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsLatest from "../components/PostsLatest";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const LatestPage = withRunTimeLoaded(
  () => {
    return (
      <Layout render={
        ({ scrollValue, height }) => {
          return (
            <>
              <SEO title={`Latest Posts`} />
              <PostsLatest scrollValue={scrollValue} height={height} />
            </>
          )
        }}>

      </Layout>
    )
  }
)

export default LatestPage
