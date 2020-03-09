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
import ParseLinks from "../../components/UIElements/ParseLinks";
import { Radar } from 'react-chartjs-2';
import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext"

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


const GET_POST_TOPICS = gql`

query getPostTopics($postId:Int){
  getPostTopics(postId:$postId, semantics:true){
    interest
    score
  }
}

`;

const ThemedTopicChart = ({ postId }) => {
    const theme = React.useContext(ThemePalletteContext)
    const [topics, setTopics] = React.useState([])
    const [score, setScore] = React.useState([])

    const { loading, error } = useQuery(GET_POST_TOPICS,
        {
            variables: {
                postId
            },
            skip: !postId,
            onCompleted: data => {
                if (data && data.getPostTopics) {
                    const newInterests = []
                    const newScores = []

                    for (const e of data.getPostTopics) {
                        newInterests.push(e.interest)
                        newScores.push(e.score)
                    }

                    setTopics(newInterests)
                    setScore(newScores)
                }
            },
            notifyOnNetworkStatusChange: true,
        });

    if (!score.length || !topics.length) return null

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                Topics
                <div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                </div>
                <Radar
                    options={{
                        legend: { display: false },
                        responsive: true,
                        scale: {
                            gridLines: {
                                color: theme.color_text_faded,
                            },
                            ticks: {
                                display: false
                            },
                            pointLabels: {
                                fontColor: theme.color_text
                            }
                        },
                        elements: {
                            line: {
                                backgroundColor: '#ec628333',
                                borderColor: '#ec6283',
                            },
                            point: {
                                borderColor: '#ec6283',
                                hoverRadius: 5,
                                hoverBorderWidth: 10,
                                borderWidth: 3,
                            }
                        },
                        tooltips: {
                            enabled: false
                        }
                    }}

                    data={{
                        labels: topics,
                        datasets: [{
                            data: score
                        }]
                    }} />
            </div>
        </>
    )
}

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
                <div>
                    <ThemedTopicChart postId={Number(props.queryParsedURL.id)} />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1rem'
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
                            <p>
                                <ParseLinks sourceLink={post.source_link}>
                                    {
                                        getIfAvailable(post, 'title', "")
                                    }
                                </ParseLinks>
                            </p>
                        </div>
                    </> :
                    <>

                        <h1>
                            <ParseLinks sourceLink={post.source_link}>{ellipsedSubstring(
                                getIfAvailable(post, 'title', "")
                            )}
                            </ParseLinks>
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
