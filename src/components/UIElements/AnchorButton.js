import React from "react"

export function AnchorButton(props) {
    const handleShareClick = (e) => {
        e.preventDefault();
    }
    return (
        <span onClick={props.onClick}>
            <a
                {...props}
                href=""
                onClick={handleShareClick}
                style={{
                    textDecoration: `none`,
                }}>
                {props.children}
            </a>
        </span>
    );
}


export default AnchorButton
