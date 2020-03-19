import gql from "graphql-tag";


export const GET_POST_RELEVANCE = gql`

query getPostRelevance($postId:Int!){
    getPostRelevancePerUserInterests(postId:$postId, semantics:true){
    interest
    score
  }
}

`;
