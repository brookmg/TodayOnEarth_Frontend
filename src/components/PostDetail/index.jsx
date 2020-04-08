/**
 * This component shows a posts details, for logged in users it will also show the relevance chart
 */
import React from "react";
import AnchorButton from "../AnchorButton";
import withQueryParsedURL from "../HOCs/withQueryParsedURL";
import Image from "../Image";
import PostMetadata from "../PostMetadata";
import ParseLinks from "../ParseLinks";
import ThemedRelevanceChart from "../ThemedRelevanceChart";
import PostInteraction from "../PostInteraction";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import Margin from "../CompoundComponents/Margin";
import { Tooltip } from "shards-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledRelativeDiv, StyledCenterTextDiv, StyledRoundDiv, StyledImage, StyledDisplayMarginFlex, StyledDisplayFlex } from "./styles";
import { POST_OPENED_MUTATION, GET_POST_DETAIL } from "./queries";
import { isLoggedIn } from "../../services/auth";


/**
 * 
 * @param {object} queryParsedURL The parsed query string of the current URL
 */
const PostDetail = withQueryParsedURL(
    ({ queryParsedURL }) => {
        const theme = React.useContext(ThemePalletteContext)
        const handleShareClick = (e) => {
            navigator.clipboard.writeText(window.location.href);
        };
        const toggleShareTooltipOpen = () => {
            setShareTooltipOpen(!isShareTooltipOpen);
        };
        const [isShareTooltipOpen, setShareTooltipOpen] = React.useState(false);
        const [postOpened] = useMutation(POST_OPENED_MUTATION)
        const { loading, error, data } = useQuery(GET_POST_DETAIL, {
            variables: {
                postid: Number(queryParsedURL.id)
            },
            onCompleted: (data) => {
                const post = data.getPost
                if (post.postid)
                    postOpened({ variables: { postid: post.postid } })
            }
        });
        const post = (data && data.getPost) || {};
        return (
            <StyledRelativeDiv>
                <StyledCenterTextDiv>
                    <StyledRoundDiv>
                        <StyledImage src={`https://www.w3schools.com/howto/img_avatar.png`} />
                    </StyledRoundDiv>
                    <p>{post.provider}</p>
                </StyledCenterTextDiv>
                <div>
                    <StyledDisplayMarginFlex>
                        <PostMetadata sourceLink={post.source_link} communityInteraction={getIfAvailable(post, `metadata.community_interaction`)} />
                    </StyledDisplayMarginFlex>

                    <AnchorButton id={`shareButton`} onClick={handleShareClick}>Share 🔗</AnchorButton>
                    <Tooltip trigger={`click`} open={isShareTooltipOpen} target={`#shareButton`} toggle={toggleShareTooltipOpen}>
                        URL copied to clipboard!
        </Tooltip>
                </div>
                <StyledDisplayFlex>

                    {loading && <p>Loading Post...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {!loading && !post.postid && <p>That post couldn't be found</p>}

                    <Image src={getIfAvailable(post, `metadata.message.image.src`) || // Telegram images
                        getIfAvailable(post, `metadata.post.thumbnail_image`)} />
                </StyledDisplayFlex>
                {post.body === `` ?
                    <>
                        <div>
                            <p>
                                <ParseLinks sourceLink={post.source_link}>
                                    {getIfAvailable(post, `title`, ``)}
                                </ParseLinks>
                            </p>
                        </div>
                    </> :
                    <>

                        <h1>
                            {ellipsedSubstring(getIfAvailable(post, `title`, ``))}
                        </h1>
                        <div>
                            <p>
                                <ParseLinks sourceLink={post.source_link}>
                                    {post.body}
                                </ParseLinks>
                            </p>
                        </div>
                    </>
                }
                {
                    post.postid && isLoggedIn() &&
                    <PostInteraction postid={post.postid} />
                }
                <StyledCenterTextDiv>
                    <a
                        href={post.source_link}
                        style={{
                            color: theme.color_text_faded,
                        }}
                        target={`_blank`}
                    >
                        {post.source_link}
                    </a>
                </StyledCenterTextDiv>
                <Margin top={`1em`}>
                    <div>
                        <ThemedRelevanceChart postId={Number(queryParsedURL.id)} />
                    </div>
                </Margin>
            </StyledRelativeDiv>
        );
    }
);

export default PostDetail