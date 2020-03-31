/**
 * This file contains queries for layout component
 */
import gql from "graphql-tag";


export const POSTS_SUBSCRIPTION = gql`

subscription{
  postAdded{
    postid
    title
  }
}
`;