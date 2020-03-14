import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import 'emoji-mart/css/emoji-mart.css'
import CreatePost from "../components/CreatePost";


const CreatePage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <CreatePost />
    </Layout>
  )
}

export default CreatePage
