import React from "react";
import Image from "../../Image";
import { StyledDiv } from "./styles";
import HappyGuyGIF from "../../../images/happy-guy.gif";


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