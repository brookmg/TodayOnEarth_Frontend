/**
 * This file contains styles for ButtonInterest component
 */
import styled from "styled-components";
import { Button } from "shards-react";


export const StyledXButton = styled.input`
    border-radius: 50%;
    height: 24px;
    width: 24px;
    background: transparent;
    border: none;
`;

export const StyledInterestButton = styled(Button)`
    padding-right: 0.5em;
    position: relative;
`;
