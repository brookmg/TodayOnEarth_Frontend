/**
 * This component reloads SSR pages so dynamic CSS values can be applied without unexpected bugs
 */
import React from "react";
import Image from "../../Image";
import HappyGuyGIF from "../../../images/happy-guy.gif";
import { StyledDiv } from "./styles";


/**
 * 
 * @param {React.ElementType} ComponentToWrap Component to load during runtime
 */
const withRunTimeLoaded = ComponentToWrap => props => {

    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            {
                isMounted ?
                    <ComponentToWrap {...props} />
                    :
                    <StyledDiv>
                        <Image src={HappyGuyGIF} />
                        <p>Loading page ...</p>
                    </StyledDiv>

            }
        </>
    )
}

export default withRunTimeLoaded;