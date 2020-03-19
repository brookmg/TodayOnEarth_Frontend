import styled from "styled-components";


export const StyledFlexDiv = styled.div`
  display: flex;
`;
export const StyledColumnDiv = styled(StyledFlexDiv)`
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
