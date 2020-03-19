import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ButtonCustom from "../ButtonCustom";
export const StyledWidthPaddingDiv = styled.div`
    width: 100%;
    padding: 0.5em;
`;
export const StyledDisplayFlexDiv = styled.div`
    display: flex
`;
export const StyledMarginButtonCustom = styled(ButtonCustom)`
    overflow: hidden;
    padding: 0;
    margin: 0.5em;
`;
export const StyledNoHorizontalPaddingButtonCustom = styled(ButtonCustom)`
    width: 100%;
    overflow: hidden;
    padding-right: 0;
    padding-left: 0;
`;
export const StyledWbSunnyIcon = styled(WbSunnyIcon)`
    width: 28px;
    height: 28px;
`;
export const StyledNightsStayIcon = styled(NightsStayIcon)`
    width: 28px;
    height: 28px;
`;
export const StyledAccountCircleIcon = styled(AccountCircleIcon)`
    width: 16px;
    height: 16px;
    margin: 0;
`;
export const StyledFlex1Div = styled.div`
    flex: 1;
    width: 100%;
    padding: 0.5em;
`;
export const StyledSpan = styled.span`
    width: 16px;
    height: 16px;
    margin: 0.5em;
`;
