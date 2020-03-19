import React from "react";
import ImagePlaceHolder from "../ImagePlaceHolder";
import { StyledImg } from "./styles";


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