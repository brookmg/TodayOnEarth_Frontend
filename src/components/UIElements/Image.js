import React from "react"
import ImagePlaceHolder from "./ImagePlaceHolder"
import styled from "styled-components"


const StyledImg = styled.img`
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
`

const Image = (props) => {
    const handleImageErrored = () => setIsImageLoadedError(true)
    const [isImageLoadedError, setIsImageLoadedError] = React.useState(false);

    return (
        props.src && !isImageLoadedError ?
            <StyledImg
                height={100}
                width={100}
                src={props.src}
                onError={handleImageErrored}
            /> :
            props.src ?
                <ImagePlaceHolder {...props} isErrorFound={isImageLoadedError} /> :
                null

    )
}

export default Image