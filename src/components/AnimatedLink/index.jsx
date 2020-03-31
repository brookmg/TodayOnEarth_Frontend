/**
 * This component makes the animated screen transitions for gatsby pages
 */
import React from "react";
import { StyledAniLink } from "./styles";


/**
 * 
 * @param {React.ElementType} children This component's children
 */
const AnimatedLink = ({ children, ...rest }) => (
    <StyledAniLink paintDrip duration={0.5} hex={`#326fe6`} {...rest}>
        {children}
    </StyledAniLink>);

export default AnimatedLink;