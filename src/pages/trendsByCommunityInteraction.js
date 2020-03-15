import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsByCommunityInteraction from "../components/PostsByCommunityInteraction";


const CommunityInteractionPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <PostsByCommunityInteraction />
    </Layout>
  )
}

export default CommunityInteractionPage
