
import React from "react";
import styled from "styled-components";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import Margin from "../CompoundComponents/Margin";
import Image from "./Image";
import PostMetadata from "./PostMetadata";
import ParseLinks from "./ParseLinks";
import ThemedCard from "./ThemedCard";
import ThemedCardTitle from "./ThemedCardTitle";
import ButtonDark from "./ButtonDark";
import PostInteraction from "./PostInteraction";
import { Link } from "gatsby";
import {
    CardBody,
    CardFooter,
} from "shards-react";


const StyledThemedCard = styled(ThemedCard)`
    overflow: hidden;
`

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledFlexDiv = styled.div`
    display: flex;
`

const StyledA = styled.a`
    flex: 1;
`

const StyledImage = styled(Image)`
    min-width: 100%;
    min-height: 100%;
`

const PostHolderCard = ({ imgSrc, id, title, body, sourceLink, metadata }) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Margin vertical={`1rem`}>
            <StyledThemedCard style={{
                borderTopLeftRadius: imgSrc && `5rem`,
            }}>
                <Link
                    to={`/p?id=${id}`}
                    style={{
                        color: theme.color_text,
                    }}
                >
                    <StyledDiv>
                        <StyledImage src={imgSrc} />
                    </StyledDiv>
                    {
                        (title || body) &&
                        <CardBody>
                            {title && <ThemedCardTitle>
                                <ParseLinks sourceLink={sourceLink}>{title}</ParseLinks>
                            </ThemedCardTitle>}
                            {body &&
                                <>
                                    <p>
                                        <ParseLinks sourceLink={sourceLink}>
                                            {body}
                                        </ParseLinks>
                                    </p>

                                    <ButtonDark>Read more &rarr;</ButtonDark>
                                </>
                            }
                        </CardBody>
                    }
                </Link>

                <PostInteraction postid={id} />

                <Margin left={`1rem`} bottom={`0.5rem`}>
                    <div>
                        <PostMetadata sourceLink={sourceLink} communityInteraction={metadata.community_interaction} />
                    </div>
                </Margin>

                <CardFooter style={{
                    color: theme.color_text_faded,
                    backgroundColor: theme.color_background
                }}>
                    <StyledFlexDiv>
                        <StyledA
                            href={sourceLink}
                            style={{
                                color: theme.color_text_faded,
                            }}
                            target={`_blank`}
                        >
                            {sourceLink}
                        </StyledA>

                    </StyledFlexDiv>
                </CardFooter>
            </StyledThemedCard>
        </Margin>
    );
}

export default PostHolderCard