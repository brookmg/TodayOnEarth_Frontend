/**
 * This component is used for displaying 3d party auth buttons
 */
import React from "react";
import ButtonCustom from "../ButtonCustom";
import Margin from "../CompoundComponents/Margin";
import { StyledAnchor, StyledImg } from "./styles";


/**
 * 
 * @param {string} url Auth url to redirect user to
 * @param {string} borderColor Border color to use for this component
 * @param {string} backgroundColor Background color to use for this component
 * @param {string} color Text color to use for this component
 * @param {string} imgSrc This component's favicon
 * @param {string} value This component's text value
 */
const ButtonSignInWith = ({ url, borderColor, backgroundColor, color, imgSrc, value, ...rest }) => {
    return (
        <StyledAnchor
            {...rest}
            href={url}>
            <ButtonCustom borderColor={borderColor} backgroundColor={backgroundColor} color={color}>
                <Margin vertical={`0`} horizontal={`0.25em`}>
                    <StyledImg src={imgSrc} />
                    <span>
                        {value}
                    </span>
                </Margin>
            </ButtonCustom>
        </StyledAnchor>
    );
};
export default ButtonSignInWith;