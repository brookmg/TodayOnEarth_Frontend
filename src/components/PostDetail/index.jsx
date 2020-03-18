import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import AnchorButton from "../AnchorButton";
import withQueryParsedURL from "../HOCs/withQueryParsedURL";
import Image from "../Image";
import PostMetadata from "../PostMetadata";
import ParseLinks from "../ParseLinks";
import ThemedRelevanceChart from "../ThemedRelevanceChart";
import PostInteraction from "../PostInteraction";
import { Tooltip } from "shards-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../../utils";


const GET_POST_DETAIL = gql`

query fetchPostDetail($postid: Int!) {
  getPost(id: $postid) {
    postid
    title
    body,
    provider,
    source_link
    published_on
    metadata{
      community_interaction {
        views
        likes
        replies
        retweets
        comments
        video_views
      }
      ... on TelegramMetadata{
        message{
          image{
            src
          }
        }
      }
      ... on InstagramMetadata{
        post{
          thumbnail_image
        }
      }
    }
    keywords{
      keyword
    }
  }
}

`;

const POST_OPENED_MUTATION = gql`

mutation setPostOpened($postid: Int){
  postOpened(postId:$postid)
}

`;

const StyledRelativeDiv = styled.div`
    position: relative;
    top: -100px;
`

const StyledCenterTextDiv = styled.div`
    text-align: center;
`

const StyledRoundDiv = styled.div`
    overflow: hidden;
    border-radius: 50%;
    margin: 0 auto;
    max-width: 200px;
    max-height: 200px;
`

const StyledImage = styled(Image)`
    height: 200px;
    width: 200px;
`

const StyledDisplayFlex = styled.div`
    display: flex;
    justify-content: center;
`

const StyledDisplayMarginFlex = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`

const PostDetail = withQueryParsedURL(({queryParsedURL}) => {
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
                <div>
                    <ThemedRelevanceChart postId={Number(queryParsedURL.id)} />
                </div>
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
            {post.postid && <PostInteraction postid={post.postid} />}
        </StyledRelativeDiv>
    );
});

export default PostDetail