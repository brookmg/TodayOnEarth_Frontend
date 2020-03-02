
import React from 'react';
import { Link } from "gatsby"

import {
    Card,
    CardTitle,
    CardBody,
    CardFooter,
    Button
} from "shards-react";

import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext"
import Margin from '../CompoundComponents/Margin';
import Image from './Image'
import PostMetadata from "./PostMetadata"
import AnimatedLink from "./AnimatedLink"
import ParseLinks from './ParseLinks';

export default function PostHolderCard(props) {
    const theme = React.useContext(ThemePalletteContext)
    return (
        <Margin vertical="1rem">
            <Card style={{
                backgroundColor: theme.color_background,
                color: theme.color_text,
                borderTopLeftRadius: props.imgSrc && '5rem',
                overflow: 'hidden'
            }}>
                <AnimatedLink
                    to={`/mobile/p?id=${props.id}`}
                    style={{
                        color: theme.color_text,
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image style={{
                            minWidth: '100%',
                            minHeight: '100%',
                        }} src={props.imgSrc} />
                    </div>

                    <CardBody>

                        {props.title && <CardTitle>
                            <ParseLinks sourceLink={props.sourceLink}>{props.title}</ParseLinks>
                        </CardTitle>}
                        {props.body &&
                            <>
                                <p>
                                    <ParseLinks sourceLink={props.sourceLink}>
                                        {props.body}
                                    </ParseLinks>
                                </p>


                                <Button theme="dark">Read more &rarr;</Button>

                            </>
                        }
                    </CardBody>
                </AnimatedLink>

                <Margin left='1rem' bottom='0.5rem'>
                    <div>
                        <PostMetadata sourceLink={props.sourceLink} communityInteraction={props.metadata.community_interaction} />
                    </div>
                </Margin>

                <CardFooter style={{
                    color: theme.color_text_faded,
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
            </Card>
        </Margin>
    );
}