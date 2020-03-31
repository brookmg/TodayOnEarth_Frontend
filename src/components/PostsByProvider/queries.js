/**
 * This file contains queries for PostsByProvider component
 */
import gql from "graphql-tag";


export const POSTS_BY_PROVIDER_QUERY = gql`

query getPostsByProvider($page: Int, $range: Int, $filter: [FilterQuery!]!) {
  getPostCustomized(
    range: $range,
    page: $page,
    jsonQuery: $filter,
    orderBy: "published_on",
    order: "DESC"
  ) {
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
    }
  }
}
`;
