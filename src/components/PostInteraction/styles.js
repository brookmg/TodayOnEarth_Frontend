/**
 * This file contains styles for PostInteraction component
 */
import styled from "styled-components";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ButtonCustom from "../ButtonCustom";


export const StyledMarginButtonCustom = styled(ButtonCustom)`
    overflow: hidden;
    padding: 0;
    margin: 0.5em;
`;

export const StyledNotInterestedIcon = styled(NotInterestedIcon)`
    width: 28px;
    height: 28px;
`;

export const StyledAddAlertIcon = styled(AddAlertIcon)`
    width: 28px;
    height: 28px;
`;

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
