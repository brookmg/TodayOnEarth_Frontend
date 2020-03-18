import React from "react";
import ThemePalletteContext from "../Contexts/ThemePalletteContext";
import styled from "styled-components";
import { Button, } from "shards-react";


const StyledXButton = styled.input`
    border-radius: 50%;
    height: 24px;
    width: 24px;
    background: transparent;
    border: none;
`

const StyledInterestButton = styled(Button)`
    padding-right: 0.5em;
    position: relative;
`

const ButtonInterest = (props) => {
    const theme = React.useContext(ThemePalletteContext)
    const [isXButtonHovered, setIsXButtonHovered] = React.useState(false)
    const [isButtonHovered, setIsButtonHovered] = React.useState(false)

    const handleButtonMouseEnter = () => setIsButtonHovered(true)
    const handleButtonMouseLeave = () => setIsButtonHovered(false)
    const handleButtonClick = () => props.onInterestClick(props.children)

    const handleXMouseEnter = (e) => {
        e.stopPropagation()
        setIsXButtonHovered(true)
    }
    const handleXMouseLeave = (e) => setIsXButtonHovered(false)
    const handleClick = (e) => {
        props.onInterestClose(props.children)
        e.preventDefault()
        e.stopPropagation()
    }


    return (
        <span>
            <StyledInterestButton
                {...props}
                theme={isXButtonHovered ? `danger` : `primary`}
                outline
                pill
                size={`sm`}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                onClick={handleButtonClick}
            >
                {props.children}

                <StyledXButton type={`button`} style={{
                    color: (isXButtonHovered || isButtonHovered) ? theme.color_text : `#007bff`,
                }}
                    value={`x`}
                    onMouseEnter={handleXMouseEnter}
                    onMouseLeave={handleXMouseLeave}
                    onClick={handleClick}
                />
            </StyledInterestButton>
        </span>
    )

}

export default ButtonInterest;