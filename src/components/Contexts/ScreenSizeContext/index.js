import React from "react";
import { useMediaQuery } from "react-responsive";


const ScreenSizeContext = React.createContext(true)

export const ScreenSizeProvider = (props) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: `(min-device-width: 1224px)`
    })

    return (
        <ScreenSizeContext.Provider value={isDesktopOrLaptop}>
            {props.children}
        </ScreenSizeContext.Provider>
    )
}

export default ScreenSizeContext;
