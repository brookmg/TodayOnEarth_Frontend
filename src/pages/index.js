import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TrendingKeywords from "../components/TrendingKeywords";
import PostsTrendingToday from "../components/PostsTrendingToday";


const IndexPage = () => {
  return (
    <Layout
      rightSideDesktopComponent={(
        <div style={{
          flex: 1,
          paddingTop: '15em',
          height: '100vh',
          overflow: 'auto'
        }}
        >
          <TrendingKeywords />
        </div>
      )}
      render={
        ({ scrollValue, height }) => {
          return (
            <>
              <SEO title="Home" />
              <PostsTrendingToday scrollValue={scrollValue} height={height} />
            </>
          )
        }}>
    </Layout>
  )
}

export default IndexPage
