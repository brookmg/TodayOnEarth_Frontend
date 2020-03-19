import gql from "graphql-tag";


export const GET_POSTS_BY_TOPIC_QUERY = gql`


query getPostsByTopic(
  $filter: [FilterQuery!]!
  $range: Int
  $semantics: Boolean
  $keywords: [String!]!
) {
  getPostsSortedByCustomKeywords(
    page: 0
    jsonQuery: $filter
    range: $range
    semantics: $semantics
    keywords: $keywords
  ) {
    postid
    title
    provider
    source_link
    published_on
    metadata {
      community_interaction {
        views
        likes
        replies
        retweets
        comments
        video_views
      }

      ... on TelegramMetadata {
        message {
          image {
            src
          }
        }
      }
      ... on InstagramMetadata {
        post {
          thumbnail_image
        }
      }
    }
  }
}
`;
