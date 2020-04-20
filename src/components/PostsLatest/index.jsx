/**
 * This component is refactored from the "/latest" page
 */
import React from "react";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "../PostHolderCard";
import Margin from "../CompoundComponents/Margin";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { useQuery } from "@apollo/react-hooks";
import { FormSelect, FormCheckbox } from "shards-react";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledDisplayFlexDiv, StyledFlex1CenterSpan, StyledP, StyledFlex1Div, StyledFlex2Div } from "./styles";
import { LATEST_POSTS_QUERY, POST_SUBSCRIPTION } from "./queries";


/* How many posts to show initially */
const DEFAULT_POST_COUNT_PER_PAGE = 5;

/* Previous frame's isBottomReached value */
let prevIsBottomReached = false

/* Post sources available by default */
const DEFAULT_POST_SOURCES = {
    't.me': true,
    'facebook.com': true,
    'instagram.com': true,
    'twitter.com': true
};

/**
 * 
 * @param {boolean} isBottomReached Will be set to true if bottom of page is reached
 */
const PostsLatest = ({ isBottomReached }) => {
    const theme = React.useContext(ThemePalletteContext);
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
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
    return (
        <StyledDisplayFlexDiv style={{ flexDirection: isDesktopOrLaptop ? `row-reverse` : `column` }}>
            <StyledFlex1Div>
                <Margin horizontal={`1em`}>
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
                    </div>
                </Margin>
            </StyledFlex1Div>
            <StyledFlex2Div>
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
            </StyledFlex2Div>
        </StyledDisplayFlexDiv>
    );
};

export default PostsLatest