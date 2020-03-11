import React from "react"
import Image from "./Image";

export function AnchorButton(props) {
    const handleShareClick = (e) => {
        e.preventDefault();
    }
    const isPreviewable = props.isPreviewable

    const [isHovered, setIsHovered] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [linkPreviewData, setLinkPreviewData] = React.useState({})

    const handleOnMouseEnter = () => isPreviewable && setIsHovered(true)
    const handleOnMouseLeave = () => { } //setIsHovered(false)

    const linkPreviewUrl = `${process.env.GATSBY_LINK_PREVIEWER_API}${encodeURIComponent(props.url)}`

    if (isHovered && !isLoading && !linkPreviewData.title) {
        console.log("loading")
        setIsLoading(true)
        fetch(linkPreviewUrl)
            .then(data => data.json())
            .then(obj => setLinkPreviewData(obj))
            .catch(err => setLinkPreviewData({ description: err }))
            .finally(() => setIsLoading(false))
    }


    return (
        <span onClick={props.onClick}>
            <a
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}

                {...props}
                href={props.url || ""}
                onClick={handleShareClick}
                style={{
                    textDecoration: `none`,
                }}>
                {props.children}
            </a>
            {isPreviewable &&
                <div style={{
                    padding: "1em"
                }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1, display: 'flex' }}>
                            <Image src={linkPreviewData.image} style={{ margin: 0 }} />
                        </div>
                        <div style={{ flex: 3, padding: '0.5em' }}>
                            <div>{!isHovered ? "Hover on url to preview" : linkPreviewData.title || (isLoading ? "Loading..." : "Error loading url preview")}</div>
                            <div>{linkPreviewData.description}</div>
                        </div>
                    </div>
                </div>}
        </span>
    );
}


export default AnchorButton
