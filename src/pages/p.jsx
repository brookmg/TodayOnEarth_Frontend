/**
 * This page provides details about a single post. Signed in users have the added benefit of 
 * being able to see the posts relation/relevance to their interests
 * 
 * Note: This is a dynamic page
 */
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostDetail from "../components/PostDetail";
import BackgroundImagePlaceHolder from "../components/BackgroundImagePlaceHolder";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";


const PostDetailPage = withRunTimeLoaded(
    (
        () => (
            <Layout>
                <SEO title={`Post Detail`} />
                <div>
                    <BackgroundImagePlaceHolder />
                    <PostDetail />
                </div>

            </Layout>
        )
    )
)

export default PostDetailPage
