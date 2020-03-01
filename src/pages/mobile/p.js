import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Tooltip } from "shards-react";
import ContentLoader from 'react-content-loader'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AnchorButton from "../../components/UIElements/AnchorButton"
import withQueryParsedURL from "../../components/HOCs/withQueryParsedURL"
import Image from "../../components/UIElements/Image"
import { getIfAvailable, ellipsedSubstring } from "../../utils"
import PostMetadata from "../../components/UIElements/PostMetadata"

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

const BackgroundImagePlaceHolder = () => <div>
    <ContentLoader height={200} style={{
        minWidth: '100%',
    }}>
        <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
</div>



const PostDetail = withQueryParsedURL((props) => {

    const handleShareClick = (e) => {
        navigator.clipboard.writeText(window.location.href)
    }
    const toggleShareTooltipOpen = () => {
        setShareTooltipOpen(!isShareTooltipOpen)
    }

    const [isShareTooltipOpen, setShareTooltipOpen] = React.useState(false);
    const { loading, error, data } = useQuery(GET_POST_DETAIL,
        {
            variables: {
                postid: Number(props.queryParsedURL.id)
            }
        }
    );
    const post = (data && data.getPost) || {}

    return (
        <div style={{
            position: 'relative',
            top: `-100px`
        }} >
            <div style={{ textAlign: 'center' }}>

                <div style={{
                    overflow: 'hidden',
                    borderRadius: `50%`,
                    margin: '0 auto',
                    maxWidth: `200px`,
                    maxHeight: `200px`,
                }}>


                    <Image
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        style={{
                            height: '200px',
                            width: '200px',
                        }}
                    />
                </div>
                <p>{post.provider}</p>
            </div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin:'1rem'
                }}>
                    <PostMetadata
                        sourceLink={post.source_link}
                        communityInteraction={
                            getIfAvailable(post, `metadata.community_interaction`)
                        } />
                </div>

                <AnchorButton id="shareButton" onClick={handleShareClick}>Share 🔗</AnchorButton>
                <Tooltip
                    trigger="click"
                    open={isShareTooltipOpen}
                    target="#shareButton"
                    toggle={toggleShareTooltipOpen}
                >
                    URL copied to clipboard!
        </Tooltip>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>

                {loading && <p>Loading Posts...</p>}
                {error && <p>Error: {error.message}</p>}
                {!post.postid && <p>That post couldn't be found</p>}

                <Image src={
                    getIfAvailable(post, 'metadata.message.image.src') || // Telegram images
                    getIfAvailable(post, 'metadata.post.thumbnail_image')}
                />
            </div>
            {
                post.body === "" ?
                    <>
                        <div>
                            <p>{
                                getIfAvailable(post, 'title', "")
                            }</p>
                        </div>
                    </> :
                    <>

                        <h1>{ellipsedSubstring(
                            getIfAvailable(post, 'title', "")
                        )}</h1>
                        <div>
                            <p>{post.body}</p>
                        </div>
                    </>

            }


        </div>

    );
})


const PostDetailPage = () => (
    <Layout>
        <SEO title="Home" />
        <div>
            <BackgroundImagePlaceHolder />

            <PostDetail />
        </div>

    </Layout>
)

export default PostDetailPage
