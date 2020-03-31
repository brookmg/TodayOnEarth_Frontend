/**
 * This page allows a user (both signed in and guest) to customize the system
 * 
 * Settings available for authenticated users:
 *  - User Interest Entry
 *  - Content Sources
 * 
 * Settings available for all users:
 *  - Theme
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL";
import ThemePreferenceSection from "../components/ThemePreferenceSection";
import ContentSourceSection from "../components/ContentSourceSection";
import UserInterestEntrySection from "../components/UserInterestEntrySection";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const SearchPage = withQueryParsedURL(
    withRunTimeLoaded(
        () => (
            <Layout>
                <SEO title={`Settings: Change theme, content sources, providers or add interests`} />

                <UserInterestEntrySection />

                <ThemePreferenceSection />

                <ContentSourceSection />
            </Layout>
        )
    )
)

export default SearchPage
