/**
 * This component is refactored from the "/userInterest" page
 */
import React from "react";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "../PostHolderCard";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { FormSelect } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledDisplayFlexDiv, StyledP, StyledFlex1Div, StyledFlex2Div } from "./styles";
import { POSTS_BY_USER_INTEREST_QUERY } from "./queries";


/* How many posts to show initially */
const DEFAULT_POST_COUNT_PER_PAGE = 5;

/* Previous frame's isBottomReached value */
let prevIsBottomReached = false

/* Time values used to filter the posts */
const TIME_NOW = Date.now();
const TIME_A_WEEK_AGO = TIME_NOW - (7 * 24 * 60 * 60 * 1000);

/**
 * 
 * @param {boolean} isBottomReached Will be set to true if bottom of page is reached
 */
export const PostsByUserInterest = ({ isBottomReached }) => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
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
    filter.push({ published_on: `${TIME_A_WEEK_AGO}`, connector: `AND` });
    filter.push({ _published_on: `${TIME_NOW}`, connector: `AND` });
    const { loading, error } = useQuery(POSTS_BY_USER_INTEREST_QUERY, {
        variables: {
            page: pageNumber,
            range: postsPerPage,
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
        <StyledDisplayFlexDiv style={{ flexDirection: isDesktopOrLaptop ? `row-reverse` : `column` }}>
            <StyledFlex1Div>
                <div style={
                    isDesktopOrLaptop ? {
                        position: `fixed`,
                        height: `80%`,
                        padding: `1em`,
                        overflowY: `auto`,
                        bottom: 0,
                        right: 0,
                        width: `30vw`
                    } : {}
                }>
                    <h2>Posts Based on your Interests</h2>
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
                </div>
            </StyledFlex1Div>
            <StyledFlex2Div>
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
            </StyledFlex2Div>
        </StyledDisplayFlexDiv>
    );
};

export default PostsByUserInterest