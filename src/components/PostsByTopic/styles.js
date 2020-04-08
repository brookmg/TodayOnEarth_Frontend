/**
 * This file contains styles for PostsByTopic component
 */
import styled from "styled-components";


export const StyledDisplayFlexDiv = styled.div`
    display: flex;
`;

export const StyledFlex1Div = styled.div`
    flex: 1;
`;

export const StyledFlex2Div = styled.div`
    flex: 2;
`;

export const StyledColumnDiv = styled(StyledDisplayFlexDiv)`
    display: flex; 
    flex-direction: column;
`;

export const StyledLeftAlignDiv = styled.div`
    text-align: left;
`;

export const StyledFontSizeDiv = styled.div`
    font-size: 0.5em;
`;

export const StyledFlex1CenterDiv = styled.div`
    flex: 1;
    align-self: center;
`;

export const StyledFlex1CenterFullWidthDiv = styled(StyledFlex1CenterDiv)`
    width: 100%;
`;

export const StyledP = styled.p`
    text-align: center;
`;
