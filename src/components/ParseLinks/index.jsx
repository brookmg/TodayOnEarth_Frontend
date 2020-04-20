/**
 * This component takes in a string and returns clickable hashtags, usernames and links.
 * It's used heavily throughout the whole website and is without a doubt the most important
 * component in the whole project.
 */
import React from "react";
import AnchorButton from "../AnchorButton";
import { isBrowser } from "../../utils";


/**
 * 
 * @param {React.ElementType} children This component's children
 * @param {string} sourceLink URL to use as context. This is useful when parsing usernames starting with '@' where a decision needs to be made whether this is a twitter or instagram username
 */
const ParseLinks = ({ children, sourceLink }) => {
    if (!children) return null

    const openLink = (url) => isBrowser() && url && window.open(url, `_blank`)
    const handleURLClick = (e) => { openLink(e.target.href) }
    const handleHashTagClick = (e) => { openLink(e.target.href) }
    const handleUsernameClick = (e) => { openLink(e.target.href) }
    const getUserNameUrl = (usernameWithoutAt) => (
        sourceLink &&
            sourceLink.includes(`instagram.com`) ?
            `https://www.instagram.com/${usernameWithoutAt}` :
            `https://www.twitter.com/${usernameWithoutAt}`
    )

    const usernameRegex = /(@[a-zA-Z0-9_.]+)/gi;
    let parts = children.split(usernameRegex);

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i]
        if (typeof part === `string`) {
            const usernameParts = part.split(usernameRegex)

            // parse username
            for (let i = 1; i < usernameParts.length; i += 2) {
                const username = usernameParts[i];
                const usernameWithoutAt = username.match(/@([a-zA-Z0-9_.]+)/i)[1]
                const url = getUserNameUrl(usernameWithoutAt)

                usernameParts[i] = <AnchorButton onClick={handleUsernameClick} url={url}>{username}</AnchorButton>;
            }
            parts[i] = usernameParts
        }
    }
    parts = parts.flat()


    const urlRegex = /(\w+\.[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)/gi;

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i]
        if (typeof part === `string`) {
            const urlParts = part.split(urlRegex)

            // parse urls
            for (let i = 1; i < urlParts.length; i += 2) {
                const url = urlParts[i];
                const splitUrl = url.split(`://`);
                const cleanUrlLeft = splitUrl[0];
                const cleanUrlRight = splitUrl[1];
                const cleanUrl = cleanUrlRight ? cleanUrlRight : cleanUrlLeft;
                urlParts[i] = <span key={i}> {cleanUrlRight && `${cleanUrlLeft}://`}
                    <AnchorButton onClick={handleURLClick} url={`http://${cleanUrl}`}>{cleanUrl}</AnchorButton>;
                    </span>;
            }
            parts[i] = urlParts
        }
    }
    parts = parts.flat()


    const hashTagRegex = /(#[a-z\d-]+)/gi;

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i]
        if (typeof part === `string`) {
            const hashTagParts = part.split(hashTagRegex)

            // parse hashtags
            for (let i = 1; i < hashTagParts.length; i += 2) {
                const hashtag = hashTagParts[i];
                hashTagParts[i] = <AnchorButton onClick={handleHashTagClick} url={`https://www.twitter.com/hashtag/${hashtag.match(/#([a-z\d-]+)/i)[1]}`}>{hashtag}</AnchorButton>;
            }
            parts[i] = hashTagParts
        }
    }
    parts = parts.flat()


    return <>{parts}</>;
};
export default ParseLinks;