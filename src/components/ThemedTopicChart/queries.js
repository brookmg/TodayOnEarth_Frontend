import gql from "graphql-tag";


export const GET_POST_TOPICS = gql`

query getPostTopics($postId:Int){
  getPostTopics(postId:$postId, semantics:true){
    interest
    score
  }
}

`;
