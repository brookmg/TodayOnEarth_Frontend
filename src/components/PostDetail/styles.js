import styled from "styled-components";
import Image from "../Image";


export const StyledRelativeDiv = styled.div`
    position: relative;
    top: -100px;
`;
export const StyledCenterTextDiv = styled.div`
    text-align: center;
`;
export const StyledRoundDiv = styled.div`
    overflow: hidden;
    border-radius: 50%;
    margin: 0 auto;
    max-width: 200px;
    max-height: 200px;
`;
export const StyledImage = styled(Image)`
    height: 200px;
    width: 200px;
`;
export const StyledDisplayFlex = styled.div`
    display: flex;
    justify-content: center;
`;
export const StyledDisplayMarginFlex = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`;
