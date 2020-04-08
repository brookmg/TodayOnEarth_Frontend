/**
 * This file contains styles for PostsFromUserProvider component
 */
import styled from "styled-components";
import ButtonCustom from "../ButtonCustom";
import { FormSelect } from "shards-react";


export const StyledDisplayFlexDiv = styled.div`
    display: flex;
`;

export const StyledFlex1Div = styled.div`
    flex: 1;
`;

export const StyledFlex2Div = styled.div`
    flex: 2;
`;

export const StyledP = styled.p`
    text-align: center;
`;

export const StyledDisplayAlignCenterFlexDiv = styled(StyledDisplayFlexDiv)`
    align-items: center;
`;

export const StyledSelect = styled(FormSelect)`
    width: auto;
`;

export const StyledMarginButtonCustom = styled(ButtonCustom)`
    overflow: hidden;
    padding: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
    min-width: fit-content;
    height: 2.5em;
`;