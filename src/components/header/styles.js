import styled from "styled-components";
import AnimatedLink from "../AnimatedLink";
import NavigationBar from "../NavigationBar";
import { Fade } from "shards-react";


export const StyledHeader = styled.header`
    margin-bottom: 1.45rem;
`;
export const StyledNavigationBar = styled(NavigationBar)`
    box-shadow: none;
    width: 256px;
    transition: left 0.2s linear;
`;
export const StyledOverlayDiv = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    display: unset;
`;
export const StyledTitleDiv = styled.div`
    margin: 0 auto;
    max-width: 960;
    padding: 1.45rem 1.0875rem;
`;
export const StyledDisplayFlexDiv = styled.div`
    display: flex;
`;
export const StyledFlex1Margin0H1 = styled.h1`
    flex: 1;
    margin: 0;
`;
export const StyledDisplayFlexCenterTextDiv = styled(StyledDisplayFlexDiv)`
    align-items: center;
`;
export const StyledFade = styled(Fade)`
    flex: 1
`;
export const StyledAnimatedLink = styled(AnimatedLink)`
    text-decoration: none;
`;
