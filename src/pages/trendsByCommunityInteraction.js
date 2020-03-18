import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsByCommunityInteraction from "../components/PostsByCommunityInteraction";


const CommunityInteractionPage = () => {
  return (
    <Layout>
      <SEO title={`Post Trends by community interaction`} />
      <PostsByCommunityInteraction />
    </Layout>
  )
}

export default CommunityInteractionPage
