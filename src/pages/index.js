import React from "react"
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getIfAvailable, ellipsedSubstring, isBrowser, removeRedundantWhitespace } from '../utils'
import PostHolderCard from '../components/UIElements/PostHolderCard'
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';
import { FormSelect, FormCheckbox } from "shards-react";
import Margin from "../components/CompoundComponents/Margin";
import ParseLinks from "../components/UIElements/ParseLinks";


const TRENDING_TODAY_QUERY = gql`

query getPaginatedPosts(
  $page: Int
  $postsPerPage: Int
  $filter: [FilterQuery!]!
) {
  getPostCustomized(page: $page, range: $postsPerPage, jsonQuery: $filter) {
    postid,
    title,
    provider,
    source_link,
    published_on,
    metadata {
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
      
    },
  }
}
`;


const DEFAULT_POST_COUNT_PER_PAGE = 5
const DEFAULT_POST_SOURCES = {
  "t.me": true,
  "facebook.com": true,
  "instagram.com": true,
  "twitter.com": true
}

const PostsTrendingToday = (props) => {
  const [pageNumber, setPageNumber] = React.useState(0)
  const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE)
  const [hasMorePosts, setHasMorePosts] = React.useState(true)
  const [posts, setPosts] = React.useState([])
  const [postSources, setPostSources] = React.useState(DEFAULT_POST_SOURCES)

  const handleNewData = (data) => {
    setHasMorePosts(true)
    if (data && data.getPostCustomized) {
      if (data.getPostCustomized.length !== 0)
        setPosts([...posts, ...data.getPostCustomized])
      else
        setHasMorePosts(false)
    }
  }

  const filter = []
  Object.keys(postSources).forEach((e) => postSources[e] && filter.push({ source: e, connector: "OR" }))

  const { loading, error } = useQuery(TRENDING_TODAY_QUERY, {
    variables: {
      page: pageNumber,
      postsPerPage: postsPerPage,
      filter
    },
    onCompleted: handleNewData,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network"
  });

  const handleScroll = (e) => {
    if (posts.length && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!hasMorePosts) return

      setPageNumber(pageNumber + 1)
    }
  }

  const resetPosts = () => {
    setPageNumber(0)
    setPosts([])
  }

  const handlePostsPerPageChange = (e) => {
    const count = Number(e.target.value)

    resetPosts()
    setPostsPerPage(count)
  }

  const handlePostSourceChange = (ev, name) => {
    const isChecked = postSources[name]
    const newSources = { ...postSources, [name]: !isChecked }

    const currentKeys = Object.keys(newSources)
    if (currentKeys.length === 0)
      return;

    let isSomethingChecked = false
    for (const e of currentKeys) {
      if (newSources[e]) {
        isSomethingChecked = true
        break;
      }
    }

    if (!isSomethingChecked) {
      for (const e of currentKeys)
        if (e !== name)
          newSources[e] = true
    }

    resetPosts()
    setPostSources(newSources);
  }

  if (isBrowser())
    window.onscroll = (e) => handleScroll(e)

  return (
    <div>
      <h2>Trending Today</h2>
      <div style={{ display: "flex" }}>
        <span style={{ flex: 1, alignSelf: 'center' }}>
          <div>
            Feed sources
          </div>
          <span>
            {
              Object.keys(postSources).map(
                e => <FormCheckbox
                  inline
                  key={e}
                  checked={!!postSources[e]}
                  onChange={ev => handlePostSourceChange(ev, e)}
                >
                  {e}
                </FormCheckbox>
              )
            }
          </span>
        </span>

        <div>
          <label>
            Posts per page:
            <FormSelect size="sm" onChange={handlePostsPerPageChange}>
              {[DEFAULT_POST_COUNT_PER_PAGE, 10, 20, 100].map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </FormSelect>
          </label>
        </div>
      </div>
      {posts && posts.length !== 0 &&
        posts.map(
          p => <PostHolderCard
            key={p.source_link}
            id={p.postid}
            title={ellipsedSubstring(p.title, 200)}
            body={p.body}
            sourceLink={p.source_link}
            imgSrc={
              getIfAvailable(p, 'metadata.message.image.src') || // Telegram images
              getIfAvailable(p, 'metadata.post.thumbnail_image') // Instagram images
            }
            metadata={p.metadata} />
        )}
      {loading && <p>Loading Posts...</p>}
      {error && <p>Error: ${error.message}</p>}
      {
        !hasMorePosts &&
        <p style={{
          textAlign: "center"
        }}>
          You have seen all the posts <EmojiEmotionsSharpIcon />
        </p>
      }
    </div>
  )
};


const GET_TODAYS_TRENDING_KEYWORDS = gql`

query getTodaysTrendingKeywords($semantics: Boolean){
  getTodaysTrendingKeywords(semantics:$semantics, page:0, range: 20){
    interest
    score
  }
}

`;

const TrendingKeywords = (props) => {
  const [semanticEnabled, setSemanticEnabled] = React.useState(false)
  const { loading, error, data } = useQuery(GET_TODAYS_TRENDING_KEYWORDS, {
    variables: {
      semantics: semanticEnabled
    }
  });

  const handleSemanticsChange = () => setSemanticEnabled(!semanticEnabled)

  const keywords = data && data.getTodaysTrendingKeywords
  return (
    <>
      <Margin horizontal="2em">
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          <h3>Today's trending keywords</h3>
          <div style={{ textAlign: 'left' }}>
            <FormCheckbox
              toggle
              small
              checked={semanticEnabled}
              onChange={handleSemanticsChange}>
              Enable Semantic Analysis
      </FormCheckbox>

          </div>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
          </div>


          <div>
            {
              !loading && keywords && keywords.filter(e => e.interest).slice(0, 20).map((e, i) => <div>
                <p style={{
                  margin: 0,
                  textAlign: 'left',
                }}>
                  No {i + 1}: <ParseLinks>{e.interest}</ParseLinks>
                </p>
              </div>)
            }
          </div>
        </div>
      </Margin>
    </>
  )
}

const IndexPage = () => {
  return (
    <Layout
      rightSideDesktopComponent={(
        <div style={{
          flex: 1,
          marginTop: '15em'
        }}
        >
          <TrendingKeywords />
        </div>
      )}>
      <SEO title="Home" />
      <PostsTrendingToday />
    </Layout>
  )
}

export default IndexPage
