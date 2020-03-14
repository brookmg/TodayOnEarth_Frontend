import React from "react";
import { Tooltip } from "shards-react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AnchorButton from "./UIElements/AnchorButton";
import withQueryParsedURL from "./HOCs/withQueryParsedURL";
import Image from "./UIElements/Image";
import { getIfAvailable, ellipsedSubstring } from "../utils";
import PostMetadata from "./UIElements/PostMetadata";
import ParseLinks from "./UIElements/ParseLinks";
import ThemedTopicChart from "./ThemedTopicChart";


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
const PostDetail = withQueryParsedURL((props) => {
    const handleShareClick = (e) => {
        navigator.clipboard.writeText(window.location.href);
    };
    const toggleShareTooltipOpen = () => {
        setShareTooltipOpen(!isShareTooltipOpen);
    };
    const [isShareTooltipOpen, setShareTooltipOpen] = React.useState(false);
    const { loading, error, data } = useQuery(GET_POST_DETAIL, {
        variables: {
            postid: Number(props.queryParsedURL.id)
        }
    });
    const post = (data && data.getPost) || {};
    return (
        <div style={{
            position: 'relative',
            top: `-100px`
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    overflow: 'hidden',
                    borderRadius: `50%`,
                    margin: '0 auto',
                    maxWidth: `200px`,
                    maxHeight: `200px`,
                }}>
                    <Image src="https://www.w3schools.com/howto/img_avatar.png" style={{
                        height: '200px',
                        width: '200px',
                    }} />
                </div>
                <p>{post.provider}</p>
            </div>
            <div>
                <div>
                    <ThemedTopicChart postId={Number(props.queryParsedURL.id)} />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1rem'
                }}>
                    <PostMetadata sourceLink={post.source_link} communityInteraction={getIfAvailable(post, `metadata.community_interaction`)} />
                </div>

                <AnchorButton id="shareButton" onClick={handleShareClick}>Share 🔗</AnchorButton>
                <Tooltip trigger="click" open={isShareTooltipOpen} target="#shareButton" toggle={toggleShareTooltipOpen}>
                    URL copied to clipboard!
        </Tooltip>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>

                {loading && <p>Loading Post...</p>}
                {error && <p>Error: {error.message}</p>}
                {!loading && !post.postid && <p>That post couldn't be found</p>}

                <Image src={getIfAvailable(post, 'metadata.message.image.src') || // Telegram images
                    getIfAvailable(post, 'metadata.post.thumbnail_image')} />
            </div>
            {post.body === "" ?
                <>
                    <div>
                        <p>
                            <ParseLinks sourceLink={post.source_link}>
                                {getIfAvailable(post, 'title', "")}
                            </ParseLinks>
                        </p>
                    </div>
                </> :
                <>

                    <h1>
                        {ellipsedSubstring(getIfAvailable(post, 'title', ""))}
                    </h1>
                    <div>
                        <p>
                            <ParseLinks sourceLink={post.source_link}>
                                {post.body}
                            </ParseLinks>
                        </p>
                    </div>
                </>}
        </div>
    );
});

export default PostDetail