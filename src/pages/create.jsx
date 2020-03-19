import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "emoji-mart/css/emoji-mart.css";
import CreatePost from "../components/CreatePost";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const CreatePage = withRunTimeLoaded(
  () => {
    return (
      <Layout>
        <SEO title={`Create Post`} />
        <CreatePost />
      </Layout>
    )
  }
)

export default CreatePage
