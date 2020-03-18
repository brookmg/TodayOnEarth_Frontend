import React from "react";
import gql from 'graphql-tag';
import styled from "styled-components";
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';
import PostHolderCard from './UIElements/PostHolderCard';
import { FormSelect } from "shards-react";
import { useQuery } from '@apollo/react-hooks';
import { getIfAvailable, ellipsedSubstring } from '../utils';


const POSTS_BY_USER_INTEREST_QUERY = gql`

query getUserInterestsPosts(
  $page: Int,
  $range: Int,
  $filter: [FilterQuery!]!
) {
    getPostsSortedByUserInterest(
    page: $page
    jsonQuery: $filter
    range: $range
    semantics: false
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
const TIME_A_WEEK_AGO = TIME_NOW - (7 * 24 * 60 * 60 * 1000);

const StyledDisplayFlexDiv = styled.div`
    display: flex;
`

const StyledP = styled.p`
    text-align: center;
`

export const PostsByUserInterest = ({ scrollValue, height }) => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE);
    const [hasMorePosts, setHasMorePosts] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const handleNewData = (data) => {
        setHasMorePosts(true);
        if (data && data.getPostsSortedByUserInterest) {
            if (data.getPostsSortedByUserInterest.length !== 0)
                setPosts([...posts, ...data.getPostsSortedByUserInterest]);
            else
                setHasMorePosts(false);
        }
    };
    const filter = [];
    filter.push({ published_on: `${TIME_A_WEEK_AGO}`, connector: "AND" });
    filter.push({ _published_on: `${TIME_NOW}`, connector: "AND" });
    const { loading, error } = useQuery(POSTS_BY_USER_INTEREST_QUERY, {
        variables: {
            page: pageNumber,
            range: postsPerPage,
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
    return (
        <div>
            <h2>Posts Based on your Interests</h2>
            <StyledDisplayFlexDiv>
                <div>
                    <label>
                        Posts per page:
                        <FormSelect size="sm" onChange={handlePostsPerPageChange}>
                            {
                                [DEFAULT_POST_COUNT_PER_PAGE, 10, 20, 100].map((e, i) => (
                                    <option key={i} value={e}>
                                        {e}
                                    </option>)
                                )
                            }
                        </FormSelect>
                    </label>
                </div>
            </StyledDisplayFlexDiv>
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
        </div>
    );
};

export default PostsByUserInterest