import gql from "graphql-tag";


export const GET_POSTS_FILTERED = gql`

query getPaginatedPostsFiltered(
  $page: Int
  $postsPerPage: Int
  $filter: [FilterQuery!]!
) {
  getPostCustomized(page: $page, range: $postsPerPage, jsonQuery: $filter) {
    postid
    title
    body,
    provider,
    source_link
    published_on
    metadata{
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
    keywords{
      keyword
    }
  }
}

`;
