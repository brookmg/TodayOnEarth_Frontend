import React from "react";
import { useMediaQuery } from "react-responsive";


const ScreenSizeContext = React.createContext(true)

export const ScreenSizeProvider = ({ children }) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: `(min-width: 1224px)`
    })

    return (
        <ScreenSizeContext.Provider value={isDesktopOrLaptop}>
            {children}
        </ScreenSizeContext.Provider>
    )
}

export default ScreenSizeContext;
