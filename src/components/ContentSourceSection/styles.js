import styled from "styled-components";
import ButtonCustom from "../ButtonCustom";
import { FormSelect } from "shards-react";


export const StyledMarginButtonCustom = styled(ButtonCustom)`
    overflow: hidden;
    padding: 0;
    margin: 0.5em;
`;
export const StyledDisplayFlexDiv = styled.div`
    display: flex;
`;
export const StyledDisplayCenterFlexDiv = styled(StyledDisplayFlexDiv)`
    justify-content: center;
`;
export const StyledDisplayAlignCenterFlexDiv = styled(StyledDisplayFlexDiv)`
    align-items: center;
`;
export const StyledRelativeDiv = styled.div`
    position: relative;
    &:focus-within {
        .floatingDiv{
            display: unset;
        }
    }
`;
export const StyledFloatingDiv = styled.div`
    position: absolute;
    z-index: 1;
    max-height: 10em;
    overflow-y: auto;
    left: 0;
    right: 0;
    padding: 1em;
    display: none;
    border-color:#007bff;
    border-bottom-right-radius: 50%;
    box-shadow:0 .313rem .719rem rgba(0,123,255,.1),0 .156rem .125rem rgba(0,0,0,.06);
`;
export const StyledP = styled.p`
    margin: 0.5em;
    
    &:hover {
        color: #007bff;
        .pIcon {
            display: unset;
        }
    }
`;
export const StyledHiddenIcon = styled.span`
    display: none;
`;
export const StyledFlex1Div = styled.div`
    flex: 1;
`;
export const StyledSelect = styled(FormSelect)`
    width: auto;
`;
