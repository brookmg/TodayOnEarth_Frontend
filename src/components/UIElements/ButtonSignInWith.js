import React from "react";
import styled from "styled-components";
import ButtonCustom from "./ButtonCustom";
import Margin from "../CompoundComponents/Margin";


const StyledAnchor = styled.a`
    display: inline-block
`

const StyledImg = styled.img`
    width: 16px;
    height: 16px;
    margin: 0;
`

const ButtonSignInWith = (props) => {
    return (
        <StyledAnchor
            {...props}
            href={props.url}>
            <ButtonCustom borderColor={props.borderColor} backgroundColor={props.backgroundColor} color={props.color}>
                <Margin vertical="0" horizontal="0.25em">
                    <StyledImg src={props.imgSrc} />
                    <span>
                        {props.value}
                    </span>
                </Margin>
            </ButtonCustom>
        </StyledAnchor>
    );
};
export default ButtonSignInWith;