import styled from "styled-components";
import { ToastContainer } from "react-toastify";


export const StyledToastContainer = styled(ToastContainer)`
  height: 100vh;
`;
export const StyledCanvas = styled.canvas`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;
export const StyledFlexDirectionRowDiv = styled.div`
    flex-direction: row;
`;
export const StyledFlex3OverflowYDiv = styled.div`
    flex: 3;
    overflow-y: auto;
    height: 100vh;
`;
export const StyledHeaderDiv = styled.div`
    margin: 0 auto;
    max-width: 960;
    padding: 0 1.0875rem 1.45rem;
`;
