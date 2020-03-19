import gql from "graphql-tag";


export const POSTS_BY_USER_INTEREST_QUERY = gql`

query getUserInterestsPosts(
  $page: Int,
  $range: Int,
  $filter: [FilterQuery!]!
) {
    getPostsSortedByUserInterest(
    page: $page
    jsonQuery: $filter
    range: $range
    semantics: false
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
