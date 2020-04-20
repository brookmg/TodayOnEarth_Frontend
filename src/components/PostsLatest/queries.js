/**
 * This file contains queries for PostsLatest component
 */
import gql from "graphql-tag";


export const LATEST_POSTS_QUERY = gql`

query getLatestPaginatedPosts(
  $page: Int
  $postsPerPage: Int
  $filter: [FilterQuery!]!,
  $orderBy: String,
  $order: String
) {
  getPostCustomized(page: $page, range: $postsPerPage, jsonQuery: $filter, orderBy: $orderBy, order: $order) {
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

export const POST_SUBSCRIPTION = gql`

subscription getNewPosts{
  postAdded{
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
