import React from "react";
import gql from 'graphql-tag';
import styled from "styled-components";
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';
import PostHolderCard from './UIElements/PostHolderCard';
import Margin from "./CompoundComponents/Margin";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import { useQuery } from '@apollo/react-hooks';
import { FormSelect, FormCheckbox } from "shards-react";
import { getIfAvailable, ellipsedSubstring } from '../utils';


const LATEST_POSTS_QUERY = gql`

query getLatestPaginatedPosts(
  $page: Int
  $postsPerPage: Int
  $filter: [FilterQuery!]!,
  $orderBy: String,
  $order: String
) {
  getPostCustomized(page: $page, range: $postsPerPage, jsonQuery: $filter, orderBy: $orderBy, order: $order) {
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

const POST_SUBSCRIPTION = gql`

subscription getNewPosts{
  postAdded{
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

const DEFAULT_POST_COUNT_PER_PAGE = 5;
const DEFAULT_POST_SOURCES = {
    't.me': true,
    'facebook.com': true,
    'instagram.com': true,
    'twitter.com': true
};
let prevScrollValue = -1;

const StyledDisplayFlexDiv = styled.div`
    display: flex;
`

const StyledFlex1CenterSpan = styled.span`
    flex: 1;
    align-self: center;
`

const StyledP = styled.p`
    text-align: center;
`

const PostsLatest = ({ scrollValue, height }) => {
    const theme = React.useContext(ThemePalletteContext);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE);
    const [hasMorePosts, setHasMorePosts] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const [postSources, setPostSources] = React.useState(DEFAULT_POST_SOURCES);
    const handleNewData = (data) => {
        setHasMorePosts(true);
        if (data && data.getPostCustomized) {
            if (data.getPostCustomized.length !== 0)
                setPosts([...posts, ...data.getPostCustomized]);
            else
                setHasMorePosts(false);
        }
    };
    const filter = [];
    Object.keys(postSources).forEach((e) => postSources[e] && filter.push({ source: e, connector: `OR` }));
    const { subscribeToMore, loading, error } = useQuery(LATEST_POSTS_QUERY, {
        variables: {
            page: pageNumber,
            postsPerPage: postsPerPage,
            filter,
            orderBy: `published_on`,
            order: `DESC`
        },
        onCompleted: handleNewData,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: `cache-and-network`
    });
    React.useEffect(() => {
        subscribeToMore({
            document: POST_SUBSCRIPTION,
            variables: {
                page: pageNumber,
                postsPerPage: postsPerPage,
                filter,
                orderBy: `published_on`,
                order: `DESC`
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev;
                const newFeedItem = subscriptionData.data.postAdded[0];
                setPosts([newFeedItem, ...posts]);
                return Object.assign({}, prev, {
                    getPostCustomized: [newFeedItem, ...prev.getPostCustomized]
                });
            }
        });
    }, []);
    if (posts.length && scrollValue !== 0 && scrollValue >= height && hasMorePosts) {
        if (prevScrollValue !== scrollValue)
            setPageNumber(pageNumber + 1);
        prevScrollValue = scrollValue;
    }
    const resetPosts = () => {
        setPageNumber(0);
        setPosts([]);
    };
    const handlePostsPerPageChange = (e) => {
        const count = Number(e.target.value);
        resetPosts();
        setPostsPerPage(count);
    };
    const handlePostSourceChange = (ev, name) => {
        const isChecked = postSources[name];
        const newSources = { ...postSources, [name]: !isChecked };
        const currentKeys = Object.keys(newSources);
        if (currentKeys.length === 0)
            return;
        let isSomethingChecked = false;
        for (const e of currentKeys) {
            if (newSources[e]) {
                isSomethingChecked = true;
                break;
            }
        }
        if (!isSomethingChecked) {
            for (const e of currentKeys)
                if (e !== name)
                    newSources[e] = true;
        }
        resetPosts();
        setPostSources(newSources);
    };
    return (<div>
        <h2>Latest Posts</h2>
        <StyledDisplayFlexDiv>
            <StyledFlex1CenterSpan>
                <div>
                    Feed sources
                </div>
                <span>
                    {Object.keys(postSources).map(e => <FormCheckbox inline key={e} checked={!!postSources[e]} onChange={ev => handlePostSourceChange(ev, e)}>
                        {e}
                    </FormCheckbox>)}
                </span>
            </StyledFlex1CenterSpan>

            <div>
                <label>
                    Posts per page:
                    <FormSelect size={`sm`} onChange={handlePostsPerPageChange}>
                        {[DEFAULT_POST_COUNT_PER_PAGE, 10, 20, 100].map((e, i) => (<option key={i} value={e}>
                            {e}
                        </option>))}
                    </FormSelect>
                </label>
            </div>
        </StyledDisplayFlexDiv>
        <Margin top={`1em`}>
            <StyledP style={{
                color: theme.color_text_faded
            }}>
                - New posts will be displayed here in real-time -
        </StyledP>
        </Margin>

        {posts && posts.length !== 0 &&
            posts.map(p => <PostHolderCard key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, `metadata.message.image.src`) || // Telegram images
                getIfAvailable(p, `metadata.post.thumbnail_image`) // Instagram images
            } metadata={p.metadata} />)}
        {loading && <p>Loading Posts...</p>}
        {error && <p>Error: ${error.message}</p>}
        {!hasMorePosts &&
            <StyledP>
                You have seen all the posts <EmojiEmotionsSharpIcon />
            </StyledP>}
    </div>);
};

export default PostsLatest