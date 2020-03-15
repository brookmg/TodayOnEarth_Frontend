import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsLatest from "../components/PostsLatest";


const LatestPage = () => {
  return (
    <Layout render={
      ({ scrollValue, height }) => {
        return (
          <>
            <SEO title="Home" />
            <PostsLatest scrollValue={scrollValue} height={height} />
          </>
        )
      }}>

    </Layout>
  )
}

export default LatestPage
