import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { getIfAvailable, ellipsedSubstring } from '../utils';
import PostHolderCard from './UIElements/PostHolderCard';
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';
import { FormSelect } from "shards-react";
const TRENDING_TODAY_QUERY = gql`

query getTodaysTrendingPosts(
  $page: Int,
  $range: Int,
  $filter: [FilterQuery!]!
  $workingOn: [String!]!
) {
  getPostsSortedByCommunityInteraction(
    page: $page
    jsonQuery: $filter
    range: $range
    semantics: false
    workingOn: $workingOn
  ) {
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

let prevScrollValue = -1;
const TIME_NOW = Date.now();
const TIME_24_HOURS_AGO = TIME_NOW - (1 * 24 * 60 * 60 * 1000);
export const PostsTrendingToday = ({ scrollValue, height }) => {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE);
  const [hasMorePosts, setHasMorePosts] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const handleNewData = (data) => {
    setHasMorePosts(true);
    if (data && data.getPostsSortedByCommunityInteraction) {
      if (data.getPostsSortedByCommunityInteraction.length !== 0)
        setPosts([...posts, ...data.getPostsSortedByCommunityInteraction]);
      else
        setHasMorePosts(false);
    }
  };
  const filter = [];
  filter.push({ published_on: `${TIME_24_HOURS_AGO}`, connector: "AND" });
  filter.push({ _published_on: `${TIME_NOW}`, connector: "AND" });
  const { loading, error } = useQuery(TRENDING_TODAY_QUERY, {
    variables: {
      page: pageNumber,
      range: postsPerPage,
      workingOn: ["views", "likes", "replies", "retweets", "comments", "video_views"],
      filter
    },
    onCompleted: handleNewData,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network"
  });
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
  return (<div>
    <h2>Trending Today</h2>
    <div style={{ display: "flex" }}>
      <div>
        <label>
          Posts per page:
            <FormSelect size="sm" onChange={handlePostsPerPageChange}>
            {[DEFAULT_POST_COUNT_PER_PAGE, 10, 20, 100].map((e, i) => (<option key={i} value={e}>
              {e}
            </option>))}
          </FormSelect>
        </label>
      </div>
    </div>
    {posts && posts.length !== 0 &&
      posts.map(p => <PostHolderCard key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, 'metadata.message.image.src') || // Telegram images
        getIfAvailable(p, 'metadata.post.thumbnail_image') // Instagram images
      } metadata={p.metadata} />)}
    {loading && <p>Loading Posts...</p>}
    {error && <p>Error: ${error.message}</p>}
    {!hasMorePosts &&
      <p style={{
        textAlign: "center"
      }}>
        You have seen all the posts <EmojiEmotionsSharpIcon />
      </p>}
  </div>);
};

export default PostsTrendingToday