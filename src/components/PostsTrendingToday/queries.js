/**
 * This file contains queries for PostsTrendingToday component
 */
import gql from "graphql-tag";


export const TRENDING_TODAY_QUERY = gql`

query getTodaysTrendingPosts(
  $page: Int,
  $range: Int,
  $filter: [FilterQuery!]!
  $workingOn: [String!]!
) {
  getPostsSortedByCommunityInteraction(
    page: $page
    jsonQuery: $filter
    range: $range
    semantics: false
    workingOn: $workingOn
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
      },
    }
}
`;
