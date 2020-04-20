/**
 * This file contains queries for CreatePost component
 */
import gql from "graphql-tag";


export const CREATE_POST_MUTATION = gql`

mutation createPost(
  $text: String!
  $upload: Upload
  $telegram: Boolean
  $linkedin: Boolean
  $twitter: Boolean
  $channel: String
  $facebook: Boolean
  $pageUrl: String  
) {
  postOnToSocials(
    text: $text
    upload: $upload
    telegram: $telegram
    linkedin: $linkedin
    facebook: $facebook
    pageUrl: $pageUrl  
    twitter: $twitter
    channel: $channel
  ){
    text
    facebook
    telegram
    linkedin
    twitter
    errors {
        facebook
        telegram
        linkedin
        twitter
    }  
  }
}
`;
