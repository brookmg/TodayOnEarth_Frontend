
import React from 'react';
import { Link } from "gatsby"

import {
    CardBody,
    CardFooter,
    Button
} from "shards-react";

import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext"
import Margin from '../CompoundComponents/Margin';
import Image from './Image'
import PostMetadata from "./PostMetadata"
import ParseLinks from './ParseLinks';
import ThemedCard from './ThemedCard';
import ThemedCardTitle from './ThemedCardTitle';
import ButtonDark from './ButtonDark';
import styled from 'styled-components';


const StyledThemedCard = styled(ThemedCard)`
    overflow: hidden;
`

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledImage = styled(Image)`
    min-width: 100%;
    min-height: 100%;
`

const PostHolderCard = (props) => {
    const theme = React.useContext(ThemePalletteContext)
    return (
        <Margin vertical="1rem">
            <StyledThemedCard style={{
                borderTopLeftRadius: props.imgSrc && '5rem',
            }}>
                <Link
                    to={`/p?id=${props.id}`}
                    style={{
                        color: theme.color_text,
                    }}
                >
                    <StyledDiv>
                        <StyledImage src={props.imgSrc} />
                    </StyledDiv>
                    {
                        (props.title || props.body) &&
                        <CardBody>
                            {props.title && <ThemedCardTitle>
                                <ParseLinks sourceLink={props.sourceLink}>{props.title}</ParseLinks>
                            </ThemedCardTitle>}
                            {props.body &&
                                <>
                                    <p>
                                        <ParseLinks sourceLink={props.sourceLink}>
                                            {props.body}
                                        </ParseLinks>
                                    </p>

                                    <ButtonDark>Read more &rarr;</ButtonDark>
                                </>
                            }
                        </CardBody>
                    }
                </Link>

                <Margin left='1rem' bottom='0.5rem'>
                    <div>
                        <PostMetadata sourceLink={props.sourceLink} communityInteraction={props.metadata.community_interaction} />
                    </div>
                </Margin>

                <CardFooter style={{
                    color: theme.color_text_faded,
                    backgroundColor: theme.color_background
                }}>

                    <a
                        href={props.sourceLink}
                        style={{
                            color: theme.color_text_faded,
                        }}
                        target="_blank"
                    >
                        {props.sourceLink}

                    </a>

                </CardFooter>
            </StyledThemedCard>
        </Margin>
    );
}

export default PostHolderCard