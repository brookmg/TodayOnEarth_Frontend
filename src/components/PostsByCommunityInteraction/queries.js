/**
 * This file contains queries for PostsByCommunityInteraction component
 */
import gql from "graphql-tag";


export const ABSOLUTE_COMMUNITY_INTERACTION_QUERY = gql`

query getPostsByAbsoluteCommunityInteraction(
  $filter: [FilterQuery!]!
  $range: Int
  $semantics: Boolean
  $workingOn: [String!]!
) {
  getPostsSortedByCommunityInteraction(
    page: 0
    jsonQuery: $filter
    range: $range
    semantics: $semantics
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

export const RELATIVE_COMMUNITY_INTERACTION_QUERY = gql`

query getPostsByRelativeCommunityInteraction(
  $filter: [FilterQuery!]!
  $range: Int
  $semantics: Boolean
  $workingOn: [String!]!
) {
  getPostsSortedByRelativeCommunityInteraction(
    page: 0
    jsonQuery: $filter
    range: $range
    semantics: $semantics
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
