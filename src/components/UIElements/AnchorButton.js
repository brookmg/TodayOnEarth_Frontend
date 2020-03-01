import React from "react"

export function AnchorButton(props) {
    const handleShareClick = (e) => {
        e.preventDefault();
    }
    return (
        <span onClick={props.onClick}>
            <a
                {...props}
                href={props.url || ""}
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
