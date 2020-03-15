import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL"
import ThemePreferenceSection from "../components/ThemePreferenceSection";
import ContentSourceSection from "../components/ContentSourceSection";
import UserInterestEntrySection from "../components/UserInterestEntrySection"

const SearchPage = withQueryParsedURL(() => (
    <Layout>
        <SEO title="Home" />

        <UserInterestEntrySection />

        <ThemePreferenceSection />

        <ContentSourceSection />
    </Layout>
))

export default SearchPage
