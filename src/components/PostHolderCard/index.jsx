
/**
 * This component is used to hold basic post information
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import Margin from "../CompoundComponents/Margin";
import PostMetadata from "../PostMetadata";
import ParseLinks from "../ParseLinks";
import ThemedCardTitle from "../ThemedCardTitle";
import ButtonDark from "../ButtonDark";
import PostInteraction from "../PostInteraction";
import { Link } from "gatsby";
import { CardBody, CardFooter } from "shards-react";
import { StyledThemedCard, StyledDiv, StyledImage, StyledFlexDiv, StyledA } from "./styles";
import { isLoggedIn } from "../../services/auth";


/**
 * 
 * @param {string} imgSrc URL of image to display
 * @param {number} id Post ID
 * @param {string} title Post title
 * @param {string} body Post body
 * @param {string} sourceLink Post original link
 * @param {object} metadata Object containing metadata information
 */
const PostHolderCard = ({ imgSrc, id, title, body, sourceLink, metadata }) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Margin vertical={`1rem`} horizontal={`auto`}>
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

                {
                    isLoggedIn() &&
                    <PostInteraction postid={id} />
                }
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