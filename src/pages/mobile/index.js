import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import PostHolderCard from '../../components/UIElements/PostHolderCard'

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <h2>Trending Today</h2>
        {
            [4, 2, 7].map(e => <PostHolderCard id={e} />)
        }

        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
)

export default IndexPage
