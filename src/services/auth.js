import gql from 'graphql-tag';
import cookie from 'react-cookies';
import { client } from "../apollo/client";
import { isBrowser } from "../utils";


const SIGN_UP_USER = gql`

mutation signUpUser($user:IUser){
  signUp(new_user: $user){
    token
}
}

`

const SIGN_IN_USER = gql`

mutation signInUser($email:String!, $password:String!){
  signIn(email: $email, password: $password){
    token
  }
}

`

const SIGN_OUT_USER = gql`

mutation signOutUser{
  signOut
}

`

const GET_USER = gql`

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
  }
}

`

const sessionCookieName = "userId"

export const getToken = () => !isBrowser() ? "" : cookie.load(sessionCookieName)

export const getUser = () => client.query({
    query: GET_USER,
    fetchPolicy: `no-cache`
})

export const handleSignIn = (user) => {
    return new Promise((resolve, reject) => {
        client
            .mutate({
                mutation: SIGN_IN_USER,
                variables: {
                    email: user.email,
                    password: user.password,
                }
            }).then(e => {
                cookie.save(sessionCookieName, e.data.signIn.token,
                    { path: `/` }
                )
                client.resetStore()
                resolve(e)
            }).catch(e => reject(e))
    })
}

export const isLoggedIn = () => {
    return !!getToken()
}

export const signOut = () => {
    return new Promise((resolve, reject) => {
        client
            .mutate({
                mutation: SIGN_OUT_USER,
            }).then(e => {
                client.resetStore()
                cookie.remove(sessionCookieName, { path: `/` })
                resolve(e)
            }).catch(e => reject(e))
    })
}

export const signUp = (user) => {
    return new Promise((resolve, reject) => {
        client
            .mutate({
                mutation: SIGN_UP_USER,
                variables: {
                    user: {
                        email: user.email,
                        password: user.password,
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        google_id: user.google_id,
                        facebook_id: user.facebook_id,
                        twitter_id: user.twitter_id,
                        github_id: user.github_id,
                        linkedin_id: user.linkedin_id,
                        telegram_id: user.telegram_id
                    }
                }
            }).then(e => {
                client.resetStore()
                resolve(e)
            }).catch(e => reject(e))
    })
}