/**
 * This file contains styles for CreatePost component
 */
import styled from "styled-components";
import { FormTextarea } from "shards-react";


export const StyledDisplayFlexDiv = styled.div`
    display: flex;
`;

export const StyledFlex1Div = styled.div`
    flex: 1;
`;

export const StyledDisplayFlex1Div = styled(StyledDisplayFlexDiv)`
    flex: 1;
`;

export const StyledFlexColumn3Div = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
`;

export const StyledFormTextarea = styled(FormTextarea)`
    font-family: emoji
`;

export const StyledFlexRowReverseDiv = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;
