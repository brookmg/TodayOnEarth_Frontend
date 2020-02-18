import React from "react"
import ContentLoader from 'react-content-loader'

const ImagePlaceHolder = (props) =>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.style
    }}>
        <ContentLoader style={{
            minWidth: '100%',
            minHeight: '100%',
        }}
            title={props.isErrorFound && "Error Loading"}
            animate={props.isErrorFound}
            speed={5}
        >
            <rect x="0" y="0" width="100%" height="100%" />
        </ContentLoader>
        <p style={{
            position: "absolute",
        }}>Could not load image</p>
    </div>


const Image = (props) => {
    const handleImageErrored = () => setIsImageLoadedError(true)
    const [isImageLoadedError, setIsImageLoadedError] = React.useState(false);

    return (
        props.src && !isImageLoadedError ?
            <img
                style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    ...props.style
                }}
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