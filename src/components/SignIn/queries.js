/**
 * This file contains queries for SignIn component
 */
import gql from "graphql-tag";


export const RESET_PASSWORD = gql`

mutation requestPasswordReset($email: String){
  resetPassword(email:$email)
}

`;
