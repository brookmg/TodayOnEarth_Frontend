import React from 'react';
import AnchorButton from './AnchorButton';

const hashTagRegex = /\B(\#[a-zA-Z]+\b)/gi;

const ParseLinks = (props) => {
    if (!props.children) return null

    const urlRegex = /(\w+\.[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)/gi;
    const parts = props.children.split(urlRegex);
    const urlParts = parts
    // parse urls
    for (let i = 1; i < urlParts.length; i += 2) {
        const url = urlParts[i];
        const splitUrl = url.split("://");
        const cleanUrlLeft = splitUrl[0];
        const cleanUrlRight = splitUrl[1];
        const cleanUrl = cleanUrlRight ? cleanUrlRight : cleanUrlLeft;
        urlParts[i] = <span key={i}> {cleanUrlRight && `${cleanUrlLeft}://`}
            <AnchorButton url={`http://${cleanUrl}`}>{cleanUrl}</AnchorButton>;
        </span>;
    }

    return <>{parts}</>;
};
export default ParseLinks;