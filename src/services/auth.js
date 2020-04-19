/**
 * This file is used to store authentication related functions
 */
import cookie from "react-cookies";
import { client } from "../apollo/client";
import { isBrowser } from "../utils";
import { GET_USER, SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER } from "./queries";

/** Cookie used for session info */
const sessionCookieName = `userId`

/** Gets the auth token 
 * @returns {string} Auth token
 */
export const getToken = () => !isBrowser() ? `` : cookie.load(sessionCookieName)

/**
 * Gets logged in user's info from server
 * @returns {Promise} Resolves with logged in user's info
 */
export const getUser = () => client.query({
    query: GET_USER,
    fetchPolicy: `no-cache`
})

/**
 * Tries to sign in a user and if successful, saves the auth token in a cookie  
 * @param {string} email Email of existing user
 * @param {string} password Password of existing user
 * @returns {Promise} Resolves if sign in was successful
 */
export const handleSignIn = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        client
            .mutate({
                mutation: SIGN_IN_USER,
                variables: {
                    email,
                    password,
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

/**
 * Fetches current the current session's auth token and saves it in a cookie  
 * @returns {Promise} Resolves with auth token successful
 */
export const refreshToken = () => {
    return new Promise((resolve, reject) => {
        client
            .query({
                query: GET_AUTH_TOKEN
            }).then(e => {
                cookie.save(sessionCookieName, e.data.getCurrentUserToken.token,
                    { path: `/` }
                )
                client.resetStore()
                resolve(e)
            }).catch(e => reject(e))
    })
}

/**
 * Checks if user is logged in.
 * Note: For the sake of speed and UX, the check is done on just the client side (without server-side verification)
 * @returns {boolean} True if user is logged in
 */
export const isLoggedIn = () => {
    return !!getToken()
}

/**
 * Signs out logged in user and clears local cookie if successful
 * @returns {Promise} Resolves if sign out was successful 
 */
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

/**
 * Signs up a new user
 * @param {string} email Email address of the new user
 * @param {string} password Password of the new user
 * @param {string} username Username of the new user 
 * @param {string} first_name First name of the new user
 * @param {string} last_name Last name of the new user
 * @param {string} google_id You can pass empty string here. This is the new users Google id, this will be filled if user chooses to sign up using Google.
 * @param {string} facebook_id You can pass empty string here. This is the new users Facebook id, this will be filled if user chooses to sign up using Facebook. 
 * @param {string} twitter_id You can pass empty string here. This is the new users Twitter id, this will be filled if user chooses to sign up using Twitter.
 * @param {string} github_id You can pass empty string here. This is the new users GitHub id, this will be filled if user chooses to sign up using GitHub. 
 * @param {string} linkedin_id You can pass empty string here. This is the new users LinkedIn id, this will be filled if user chooses to sign up using LinkedIn.
 * @param {string} telegram_id You can pass empty string here. This is the new users Telegram id, this will be filled if user chooses to sign up using Telegram.
 * @returns {Promise} Resolves if sign up was successful
 */
export const signUp = ({
    email, password, username, first_name, last_name,
    google_id, facebook_id, twitter_id, github_id, linkedin_id, telegram_id
}) => {
    return new Promise((resolve, reject) => {
        client
            .mutate({
                mutation: SIGN_UP_USER,
                variables: {
                    user: {
                        email: email,
                        password: password,
                        username: username,
                        first_name: first_name,
                        last_name: last_name,
                        google_id: google_id,
                        facebook_id: facebook_id,
                        twitter_id: twitter_id,
                        github_id: github_id,
                        linkedin_id: linkedin_id,
                        telegram_id: telegram_id
                    }
                }
            }).then(e => {
                client.resetStore()
                resolve(e)
            }).catch(e => reject(e))
    })
}