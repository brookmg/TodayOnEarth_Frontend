/**
 * This file contains styles for PostsByCommunityInteraction component
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
  flex-direction: column;
`;

export const StyledLeftAlignDiv = styled.div`
    text-align: left
`;

export const StyledFlex1CenteredDiv = styled.div`
    flex: 1;
    align-self: center;
`;

export const StyledFlex1CenteredSpan = styled.span`
    flex: 1;
    align-self: center;
`;
