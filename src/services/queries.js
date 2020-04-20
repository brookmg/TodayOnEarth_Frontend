import gql from "graphql-tag";


/**
 * Mutation used to sign up a new user
 */
export const SIGN_UP_USER = gql`

mutation signUpUser($user:IUser){
  signUp(new_user: $user){
    token
  }
}

`;

/**
 * Mutation used to sign in an existing user
 */
export const SIGN_IN_USER = gql`

mutation signInUser($email:String!, $password:String!){
  signIn(email: $email, password: $password){
    token
  }
}

`;

/**
 * Mutation used to sign out a logged in user
 */
export const SIGN_OUT_USER = gql`

mutation signOutUser{
  signOut
}

`;

/**
 * Query used to get information about a logged in user
 */
export const GET_USER = gql`

query getUserInfo{
  getUser{
    uid
    first_name
    middle_name
    last_name
    email
    username
    phone_number
    country
    last_location
    facebook_id
    twitter_id
    github_id
    linkedin_id
    telegram_id
    is_verified
  }
}

`;

/**
 * Query used to fetch auth token. Will return null for non-logged in users
 */
export const GET_AUTH_TOKEN = gql`

query getToken {
  getCurrentUserToken {
    token
  }
}

`;
