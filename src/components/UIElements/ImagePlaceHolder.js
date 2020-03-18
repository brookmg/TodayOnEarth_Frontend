import React from "react";
import ContentLoader from 'react-content-loader';
import styled from "styled-components";


const StyledImagePlaceHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledContentLoader = styled(ContentLoader)`
    min-width: 100%;
    min-height: 100%;
`

const StyledParagraph = styled.p`
    position: absolute;
`

const ImagePlaceHolder = (props) => <StyledImagePlaceHolder>
    <StyledContentLoader title={props.isErrorFound && `Error Loading`} animate={props.isErrorFound} speed={5}>
        <rect x={`0`} y={`0`} width={`100%`} height={`100%`} />
    </StyledContentLoader>
    <StyledParagraph>Could not load image</StyledParagraph>
</StyledImagePlaceHolder>;

export default ImagePlaceHolder