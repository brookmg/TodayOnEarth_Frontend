import gql from "graphql-tag";


export const POSTS_FROM_USER_PROVIDER_QUERY = gql`

query getPostsFromUserProvider(
  $page: Int,
  $range: Int,
  $fruitPunch: Boolean,
  $fruitLimit: Int
) {
    getPostsForUser(
    page: $page
    range: $range
    fruitPunch: $fruitPunch
    fruitLimit: $fruitLimit
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
