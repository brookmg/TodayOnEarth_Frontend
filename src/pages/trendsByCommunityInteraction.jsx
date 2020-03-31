/**
 * This page shows posts that are sorted by community interaction. Across multiple social
 * media You can look for posts with highest likes, highest likes and comments and so on.
 * 
 * It also has a relative interaction parameter that benchmarks a post with the current provider's
 * past performance, it's useful to give a rough estimate for posts that are likely to perform better
 * if providers with a higher user following are to post similar content
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsByCommunityInteraction from "../components/PostsByCommunityInteraction";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const CommunityInteractionPage = withRunTimeLoaded(
  () => {
    return (
      <Layout>
        <SEO title={`Post Trends by community interaction`} />
        <PostsByCommunityInteraction />
      </Layout>
    )
  }
)

export default CommunityInteractionPage
