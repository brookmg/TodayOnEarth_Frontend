/**
 * This file contains queries for PasswordReset component
 */
import gql from "graphql-tag";


export const RESET_PASSWORD = gql`

mutation passwordReset($token: String, $newPassword: String){
 resetPasswordWithToken(token: $token, newPassword: $newPassword)
}

`;
