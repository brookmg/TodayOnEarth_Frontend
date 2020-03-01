import React from "react"
import { Link } from "gatsby"
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { getIfAvailable, ellipsedSubstring } from '../../utils'

import PostHolderCard from '../../components/UIElements/PostHolderCard'

const TRENDING_TODAY_QUERY = gql`
{
  getPosts {
    postid,
    title,
    provider,
    source_link,
    published_on,
    metadata {
      community_interaction {
        views
        likes
        replies
        retweets
        comments
        video_views
      }
    
      ... on TelegramMetadata{
        message{
          image{
            src
          }
        }
      }
       ... on InstagramMetadata{
        post{
          thumbnail_image
        }
      }
      
    },
  }
}
`;


const IndexPage = () => {
    const { loading, error, data } = useQuery(TRENDING_TODAY_QUERY);
    const posts = (data && data.getPosts) || []

    return (
        <Layout>
            <SEO title="Home" />

            {loading && <p>Loading Posts...</p>}
            {error && <p>Error: ${error.message}</p>}


            <h2>Trending Today</h2>
            {
                posts &&
                posts.length !== 0 &&
                posts.map(
                    p => <PostHolderCard
                        key={p.source_link}
                        id={p.postid}
                        title={ellipsedSubstring(p.title,200)}
                        body={p.body}
                        sourceLink={p.source_link}
                        imgSrc={
                            getIfAvailable(p, 'metadata.message.image.src') || // Telegram images
                            getIfAvailable(p, 'metadata.post.thumbnail_image') // Instagram images
                        }
                        metadata={p.metadata}
                    />)
            }

            <Link to="/page-2/">Go to page 2</Link>
        </Layout>
    )
}

export default IndexPage
