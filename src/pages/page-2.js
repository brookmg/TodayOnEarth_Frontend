import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AnimatedLink from "../components/UIElements/AnimatedLink"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <AnimatedLink to="/">Go back to the homepage</AnimatedLink>
  </Layout>
)

export default SecondPage
