import styled from "styled-components";
import Image from "../Image";


export const StyledA = styled.a`
    text-decoration: none;
`;
export const StyledPaddedDiv = styled.div`
    padding: 1em;
`;
export const StyledDisplayFlexDiv = styled.div`
    display: flex;
`;
export const StyledDisplayFlex1Div = styled(StyledDisplayFlexDiv)`
    display: flex;
    flex: 1;
`;
export const StyledImage = styled(Image)`
    margin: 0;
`;
export const StyledFlex3Div = styled.div`
    padding: 0.5em;
    flex: 3;
`;
