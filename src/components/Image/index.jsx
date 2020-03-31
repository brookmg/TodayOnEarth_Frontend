/**
 * This component is the primary way to load images. It has the unique feature of notifying the
 * user if problems occur when loading the image. 
 */
import React from "react";
import ImagePlaceHolder from "../ImagePlaceHolder";
import { StyledImg } from "./styles";


/**
 * 
 * @param {string} src Source url of image to load
 */
const Image = ({ src, ...rest }) => {
    const handleImageErrored = () => setIsImageLoadedError(true)
    const [isImageLoadedError, setIsImageLoadedError] = React.useState(false);

    return (
        src && !isImageLoadedError ?
            <StyledImg
                height={100}
                width={100}
                src={src}
                onError={handleImageErrored}
            /> :
            src ?
                <ImagePlaceHolder {...rest} isErrorFound={isImageLoadedError} /> :
                null

    )
}

export default Image