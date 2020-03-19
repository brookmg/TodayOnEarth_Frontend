import React from "react";
import { StyledAniLink } from "./styles";


const AnimatedLink = (props) => (
    <StyledAniLink paintDrip duration={0.5} hex={`#326fe6`} {...props}>
        {props.children}
    </StyledAniLink>);

export default AnimatedLink;