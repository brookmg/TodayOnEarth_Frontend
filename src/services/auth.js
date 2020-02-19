import gql from 'graphql-tag';
import cookie from 'react-cookies'
import { client } from "../apollo/client"

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

export const isBrowser = () => typeof window !== "undefined"

export const getToken = () => !isBrowser() ? "" : cookie.load(sessionCookieName)

export const getUser = () => client.query({
    query: GET_USER,
    fetchPolicy: 'no-cache'
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
                    { path: '/' }
                )
                client.resetStore()
                resolve(e)
            }).catch(e => reject(e))
    })
}

export const isLoggedIn = () => {
    return !!getToken()
}

export const logout = (callback) => {
    cookie.remove(sessionCookieName, { path: '/' })
    client.resetStore()
    callback()
}

export const signUp = (user) => {
    return client
        .mutate({
            mutation: SIGN_UP_USER,
            variables: {
                user: {
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            }
        })
}