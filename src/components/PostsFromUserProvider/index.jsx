import React from "react";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "../PostHolderCard";
import { FormSelect, FormCheckbox } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledDisplayFlexDiv, StyledP } from "./styles";
import { POSTS_FROM_USER_PROVIDER_QUERY } from "./queries";


const DEFAULT_POST_COUNT_PER_PAGE = 5;

let prevScrollValue = -1;

export const PostsFromUserProvider = ({ scrollValue, height }) => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE);
    const [hasMorePosts, setHasMorePosts] = React.useState(true);
    const [isFruitPunch, setIsFruitPunch] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const handleNewData = (data) => {
        setHasMorePosts(true);
        if (data && data.getPostsForUser) {
            if (data.getPostsForUser.length !== 0)
                setPosts([...posts, ...data.getPostsForUser]);
            else
                setHasMorePosts(false);
        }
    };

    const { loading, error } = useQuery(POSTS_FROM_USER_PROVIDER_QUERY, {
        variables: {
            page: pageNumber,
            range: postsPerPage,
            fruitPunch: isFruitPunch,
            fruitLimit: isFruitPunch ? 10 : 0
        },
        onCompleted: handleNewData,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: `cache-and-network`
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
    const handleIsFruitPunchChange = (e) => setIsFruitPunch(!isFruitPunch)
    return (
        <div>
            <h2>Posts from People you Follow</h2>
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
                    <FormCheckbox toggle small checked={isFruitPunch} onChange={handleIsFruitPunchChange}>
                        Mix with similar posts from other users
                    </FormCheckbox>
                </div>
            </StyledDisplayFlexDiv>
            {posts && posts.length !== 0 &&
                posts.map(p => <PostHolderCard showRelevance={true} key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, `metadata.message.image.src`) || // Telegram images
                    getIfAvailable(p, `metadata.post.thumbnail_image`) // Instagram images
                } metadata={p.metadata} />)}
            {(!loading && posts.length === 0) && <StyledP>No posts found, try adding more content sources ( Settings > Content Sources ) </StyledP>}
            {loading && <p>Loading Posts...</p>}
            {error && <p>Error: ${error.message}</p>}
            {!hasMorePosts &&
                <StyledP>
                    You have seen all the posts <EmojiEmotionsSharpIcon />
                </StyledP>}
        </div>
    );
};

export default PostsFromUserProvider