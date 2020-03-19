import React from "react";
import { StyledImagePlaceHolder, StyledContentLoader, StyledParagraph } from "./styles";


const ImagePlaceHolder = ({isErrorFound,}) => <StyledImagePlaceHolder>
    <StyledContentLoader title={isErrorFound && `Error Loading`} animate={isErrorFound} speed={5}>
        <rect x={`0`} y={`0`} width={`100%`} height={`100%`} />
    </StyledContentLoader>
    <StyledParagraph>Could not load image</StyledParagraph>
</StyledImagePlaceHolder>;

export default ImagePlaceHolder