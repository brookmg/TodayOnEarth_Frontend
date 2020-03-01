import React from "react"
import { Button, } from "shards-react";
import ThemePalletteContext from "../Contexts/ThemePalletteContext"

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

            <Button
                {...props}
                style={{
                    ...props.style,
                    paddingRight: "0.5em",
                    position: 'relative',
                }}
                theme={isXButtonHovered ? "danger" : "primary"}
                outline
                pill
                size="sm"
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                onClick={handleButtonClick}
            >
                {props.children}

                <input type="button" style={{
                    borderRadius: "50%",
                    height: "24px",
                    width: "24px",
                    background: 'transparent',
                    color: (isXButtonHovered || isButtonHovered) ? theme.color_text : '#007bff',
                    border: "none"

                }}
                    value="x"
                    onMouseEnter={handleXMouseEnter}
                    onMouseLeave={handleXMouseLeave}
                    onClick={handleClick}
                />
            </Button>

        </span>
    )

}

export default ButtonInterest;