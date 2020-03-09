/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import "./layout.css"
import ThemePalletteContext from "./Contexts/ThemePalletteContext"
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const POSTS_SUBSCRIPTION = gql`

subscription{
  postAdded{
    title
  }
}
`;


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const theme = React.useContext(ThemePalletteContext)

  const { data: postData, loading } = useSubscription(
    POSTS_SUBSCRIPTION,
  );

  if (postData) {
    const postAdded = postData.postAdded[0]

    if (postAdded.title && !loading) toast(postAdded.title)
  }

  return (
    <div style={{
      color: theme.color_text,
      backgroundColor: theme.color_background
    }}>
      <ToastContainer hideProgressBar={true} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          fontFamily: theme.font_family
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
