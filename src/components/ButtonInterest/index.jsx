/**
 * This component is a pill shaped button used to show user interests
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { StyledInterestButton, StyledXButton } from "./styles";


/**
 * 
 * @param {function} onInterestClick Callback executed when the interest is clicked
 * @param {React.ElementType} children This component's children
 * @param {function} onInterestClose Callback executed when the interest's 'x' button is clicked
 */
const ButtonInterest = ({ onInterestClick, children, onInterestClose, ...rest }) => {
    const theme = React.useContext(ThemePalletteContext)
    const [isXButtonHovered, setIsXButtonHovered] = React.useState(false)
    const [isButtonHovered, setIsButtonHovered] = React.useState(false)

    const handleButtonMouseEnter = () => setIsButtonHovered(true)
    const handleButtonMouseLeave = () => setIsButtonHovered(false)
    const handleButtonClick = () => onInterestClick(children)

    const handleXMouseEnter = (e) => {
        e.stopPropagation()
        setIsXButtonHovered(true)
    }
    const handleXMouseLeave = (e) => setIsXButtonHovered(false)
    const handleClick = (e) => {
        onInterestClose(children)
        e.preventDefault()
        e.stopPropagation()
    }


    return (
        <span>
            <StyledInterestButton
                {...rest}
                theme={isXButtonHovered ? `danger` : `primary`}
                outline
                pill
                size={`sm`}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                onClick={handleButtonClick}
            >
                {children}
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