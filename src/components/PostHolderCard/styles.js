/**
 * This file contains styles for PostHolderCard component
 */
import styled from "styled-components";
import Image from "../Image";
import ThemedCard from "../ThemedCard";


export const StyledThemedCard = styled(ThemedCard)`
    overflow: hidden;
    transition: box-shadow 0.5s ease-in-out;
    &:hover {
        box-shadow: 0px 0px 20px 0px #387bfe66;
    }
    &:active {
        box-shadow: 0px 0px 20px 0px #387bfeee;
    }
`;

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledFlexDiv = styled.div`
    display: flex;
`;

export const StyledA = styled.a`
    flex: 1;
`;

export const StyledImage = styled(Image)`
    min-width: 100%;
    min-height: 100%;
`;
