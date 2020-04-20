/**
 * This component is refactored from the "/today" page
 */
import React from "react";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "../PostHolderCard";
import { useQuery } from "@apollo/react-hooks";
import { FormSelect } from "shards-react";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledDisplayFlexDiv, StyledP } from "./styles";
import { TRENDING_TODAY_QUERY } from "./queries";


/* How many posts to show initially */
const DEFAULT_POST_COUNT_PER_PAGE = 5;

/* Previous frame's isBottomReached value */
let prevIsBottomReached = false

const TIME_NOW = Date.now();
const TIME_24_HOURS_AGO = TIME_NOW - (1 * 24 * 60 * 60 * 1000);

/**
 * 
 * @param {boolean} isBottomReached Will be set to true if bottom of page is reached
 */
export const PostsTrendingToday = ({ isBottomReached }) => {
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
    filter.push({ published_on: `${TIME_24_HOURS_AGO}`, connector: `AND` });
    filter.push({ _published_on: `${TIME_NOW}`, connector: `AND` });
    const { loading, error } = useQuery(TRENDING_TODAY_QUERY, {
        variables: {
            page: pageNumber,
            range: postsPerPage,
            workingOn: [`views`, `likes`, `replies`, `retweets`, `comments`, `video_views`],
            filter
        },
        onCompleted: handleNewData,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: `cache-and-network`
    });

    if (posts.length && prevIsBottomReached !== isBottomReached && isBottomReached && hasMorePosts) {
        setPageNumber(pageNumber + 1);
    }
    prevIsBottomReached = isBottomReached

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
            <h2>Trending Today</h2>
            <StyledDisplayFlexDiv>
                <div>
                    <label>
                        Posts per page:
                        <FormSelect size={`sm`} onChange={handlePostsPerPageChange}>
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

export default PostsTrendingToday