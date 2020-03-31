/**
 * This page is displayed if a 404 error occurs
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import NotFound from "../components/NotFound";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const NotFoundPage = withRunTimeLoaded(
  () =>
    (
      <Layout>
        <SEO title={`404: Not found`} />
        <NotFound />
      </Layout>
    )
)

export default NotFoundPage
