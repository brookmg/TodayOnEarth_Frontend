import React from "react";
import { StyledA, StyledPaddedDiv, StyledDisplayFlexDiv, StyledDisplayFlex1Div, StyledImage, StyledFlex3Div } from "./styles";


const AnchorButton = (props) => {
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
        console.log(`loading`)
        setIsLoading(true)
        fetch(linkPreviewUrl)
            .then(data => data.json())
            .then(obj => setLinkPreviewData(obj))
            .catch(err => setLinkPreviewData({ description: err }))
            .finally(() => setIsLoading(false))
    }


    return (
        <span onClick={props.onClick}>
            <StyledA
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}

                {...props}
                href={props.url || ``}
                onClick={handleShareClick}
            >
                {props.children}
            </StyledA>
            {isPreviewable &&
                <StyledPaddedDiv>
                    <StyledDisplayFlexDiv>
                        <StyledDisplayFlex1Div>
                            <StyledImage src={linkPreviewData.image} />
                        </StyledDisplayFlex1Div>
                        <StyledFlex3Div>
                            <div>{!isHovered ? `Hover on url to preview` : linkPreviewData.title || (isLoading ? `Loading...` : `Error loading url preview`)}</div>
                            <div>{linkPreviewData.description}</div>
                        </StyledFlex3Div>
                    </StyledDisplayFlexDiv>
                </StyledPaddedDiv>}
        </span>
    );
}


export default AnchorButton