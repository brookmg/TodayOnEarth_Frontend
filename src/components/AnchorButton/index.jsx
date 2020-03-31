/**
 * This component is responsible for providing an customized anchor tag that allows users to
 * hover and preview the url
 */
import React from "react";
import { StyledA, StyledPaddedDiv, StyledDisplayFlexDiv, StyledDisplayFlex1Div, StyledImage, StyledFlex3Div } from "./styles";


/**
 *
 * @param {string} url Url to use on this component
 * @param {boolean} isPreviewable Set to true to allow the url to be previewable
 * @param {function} onClick Callback to execute when this item is clicked
 * @param {React.ElementType} children The anchor components children 
 */
const AnchorButton = ({ isPreviewable, url, onClick, children, ...rest }) => {
    const handleShareClick = (e) => {
        e.preventDefault();
    }

    const [isHovered, setIsHovered] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [linkPreviewData, setLinkPreviewData] = React.useState({})

    const handleOnMouseEnter = () => isPreviewable && setIsHovered(true)
    const handleOnMouseLeave = () => { } //setIsHovered(false)

    const linkPreviewUrl = `${process.env.GATSBY_LINK_PREVIEWER_API}${encodeURIComponent(url)}`

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
        <span onClick={onClick}>
            <StyledA
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                {...rest}
                href={url || ``}
                onClick={handleShareClick}
            >
                {children}
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
