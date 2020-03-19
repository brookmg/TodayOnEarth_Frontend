import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostsByTopic from "../components/PostsByTopic";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const TrendsByTopicPage = withRunTimeLoaded(
  () => {
    return (
      <Layout>
        <SEO title={`Post trends by topic`} />
        <PostsByTopic />
      </Layout>
    )
  }
)

export default TrendsByTopicPage
