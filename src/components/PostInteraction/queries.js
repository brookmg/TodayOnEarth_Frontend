import gql from "graphql-tag";


export const POST_LIKED_MUTATION = gql`

mutation setPostLiked($postid: Int){
  postLiked(postId:$postid)
}

`;
export const POST_UNLIKED_MUTATION = gql`

mutation setUnPostLiked($postid: Int){
  postUnLiked(postId:$postid)
}

`;
export const POST_DISLIKED_MUTATION = gql`

mutation setPostDisLiked($postid: Int){
  postDisLiked(postId:$postid)
}

`;
export const POST_UNDISLIKED_MUTATION = gql`

mutation setPostUnDisLiked($postid: Int){
  postUnDisLiked(postId:$postid)
}

`;
