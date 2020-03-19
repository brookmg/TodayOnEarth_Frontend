import React from "react";
import ButtonCustom from "../ButtonCustom";
import Margin from "../CompoundComponents/Margin";
import { StyledAnchor, StyledImg } from "./styles";


const ButtonSignInWith = (props) => {
    return (
        <StyledAnchor
            {...props}
            href={props.url}>
            <ButtonCustom borderColor={props.borderColor} backgroundColor={props.backgroundColor} color={props.color}>
                <Margin vertical={`0`} horizontal={`0.25em`}>
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