import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsByTopic from "../components/PostsByTopic";


const TrendsByTopicPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <PostsByTopic />
    </Layout>
  )
}

export default TrendsByTopicPage
