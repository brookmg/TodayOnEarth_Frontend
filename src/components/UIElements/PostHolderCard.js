
import React from 'react';
import { Link } from "gatsby"

import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button
} from "shards-react";

import ContentLoader from 'react-content-loader'

import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext"
import Margin from '../CompoundComponents/Margin';

const ImagePlaceHolder = () =>
    <ContentLoader style={{
        minWidth: '100%',
        minHeight: '100%',
    }}>
        <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>



export default function PostHolderCard(props) {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Margin vertical="1rem">
            <Card style={{
                backgroundColor: theme.color_background,
                color: theme.color_text,
            }}>
                <CardHeader>Mark Zuckerburg</CardHeader>
                {
                    (props.src) ?
                        <CardImg src="" />
                        :
                        <ImagePlaceHolder />
                }

                <CardBody>

                    <CardTitle>Main Title</CardTitle>
                    <p>A lil bit of body (expandable)</p>

                    <Link
                        to={`/mobile/p?id=${props.id}`}
                        style={{
                            color: theme.color_text,
                        }}
                    >
                        <Button theme="dark">Read more &rarr;</Button>

                    </Link>

                </CardBody>
                <CardFooter style={{
                    color: theme.color_text_faded,
                }}>

                    <a
                        href={`https://google.com/${props.source_link}`} // TODO: change this later
                        style={{
                            color: theme.color_text_faded,
                        }}
                    >
                        source_link
    
                </a>

                </CardFooter>
            </Card>
        </Margin>
    );
}