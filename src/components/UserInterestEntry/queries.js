import gql from "graphql-tag";


export const GET_USER_INTERESTS = gql`

query getUserInterests{
  getUser{
    interests{
      interest
      score
    }
  }
}

`;
export const UPDATE_USER_INTERESTS = gql`

mutation updateInterests($interests:[IInterest]!){
    cleanUpdateInterestList(interests:$interests)
}

`;
