import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import styled from 'styled-components';


const StyledAniLink = styled(AniLink)`
    color: #007bff;
    &:hover {
        color: inherit;
    }
`;


const AnimatedLink = (props) => (
    <StyledAniLink paintDrip duration={0.5} hex={`#326fe6`} {...props}>
        {props.children}
    </StyledAniLink>);

export default AnimatedLink;