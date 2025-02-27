/**
 * This component is refactored from the "/archives" page
 */
import React from "react";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "../PostHolderCard";
import Margin from "../CompoundComponents/Margin";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { FormSelect, FormInput } from "shards-react";
import { useLazyQuery } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledDisplayFlexDiv, StyledP, StyledSelect, StyledDisplayAlignCenterFlexDiv, StyledMarginButtonCustom, StyledFlex1Div, StyledFlex2Div } from "./styles";
import { POSTS_BY_PROVIDER_QUERY } from "./queries";


/* How many posts to show initially */
const DEFAULT_POST_COUNT_PER_PAGE = 5;

/* Previous frame's isBottomReached value */
let prevIsBottomReached = false

/* This is a list of providers the server can process */
const AVAILABLE_SOURCES = [`Twitter`, `Facebook`, `Instagram`, `Telegram`]

/**
 * 
 * @param {boolean} isBottomReached Will be set to true if bottom of page is reached
 */
export const PostsByProvider = ({ isBottomReached }) => {
    const theme = React.useContext(ThemePalletteContext)
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE);
    const [hasMorePosts, setHasMorePosts] = React.useState(true);
    const [sourceText, setSourceText] = React.useState(AVAILABLE_SOURCES[0]);
    const [providerText, setProviderText] = React.useState("");
    const [posts, setPosts] = React.useState([]);
    const handleNewData = (data) => {
        setHasMorePosts(true);
        if (data && data.getPostCustomized) {
            if (data.getPostCustomized.length !== 0)
                setPosts([...posts, ...data.getPostCustomized]);
            else
                setHasMorePosts(false);
        }
    };
    const loadPostsWithHooks = (optionalPageCount, optionalPageNumber) => loadPosts({
        variables: {
            page: optionalPageNumber || pageNumber,
            range: optionalPageCount || postsPerPage,
            filter
        },
    })
    const handleSourceChange = (ev) => setSourceText(ev.target.value)
    const handleProviderChange = (ev) => setProviderText(ev.target.value)
    const handleSearch = () => {
        resetPosts()
        loadPostsWithHooks()
    }

    const filter = [];

    filter.push({ source: sourceText.toLowerCase(), connector: `AND` });
    filter.push({ provider: providerText.toLowerCase(), connector: `AND` });

    const [loadPosts, { called, loading, error }] = useLazyQuery(POSTS_BY_PROVIDER_QUERY, {
        onCompleted: handleNewData,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: `cache-and-network`
    });

    if (posts.length && prevIsBottomReached !== isBottomReached && isBottomReached && hasMorePosts) {
        const newPageNumber = pageNumber + 1
        setPageNumber(newPageNumber);
        loadPostsWithHooks(false, newPageNumber)
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
        loadPostsWithHooks(count)
    };
    const handleKeyDown = (e) => {
        if (e.key === `Enter` || e.key === ` `) {
            handleSearch()
            e.preventDefault();
        }
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
                    <h2>Posts by Provider</h2>
                    <StyledDisplayAlignCenterFlexDiv>
                        <Margin horizontal={`0.25em`}>
                            <StyledSelect onChange={handleSourceChange}>
                                {
                                    AVAILABLE_SOURCES.map((source) => {
                                        return (<option key={source}>{source}</option>);
                                    })
                                }
                            </StyledSelect>
                            <FormInput value={providerText} onKeyDown={handleKeyDown} onChange={handleProviderChange} size={`sm`} placeholder={`Provider Name`} />
                            <StyledMarginButtonCustom
                                onClick={handleSearch}
                                borderColor={theme.color_background}
                                backgroundColor={theme.color_background}
                                color={theme.color_text}>
                                <Margin vertical={`0.25em`} horizontal={`0.25em`}>
                                    <div>
                                        Search
                            </div>
                                </Margin>
                            </StyledMarginButtonCustom>
                        </Margin>
                    </StyledDisplayAlignCenterFlexDiv>
                    {
                        called &&
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
                    }
                    {!called && <StyledP>Input a provider above and click on the search button</StyledP>}
                </div>
            </StyledFlex1Div>
            <StyledFlex2Div>
                {posts && posts.length !== 0 &&
                    posts.map(p => <PostHolderCard showRelevance={true} key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, `metadata.message.image.src`) || // Telegram images
                        getIfAvailable(p, `metadata.post.thumbnail_image`) // Instagram images
                    } metadata={p.metadata} />)}
                {called && (!loading && posts.length === 0) && <StyledP>No posts found, try adding more content sources ( Settings > Content Sources ) </StyledP>}
                {loading && <p>Loading Posts...</p>}
                {error && <p>Error: ${error.message}</p>}
                {!(called && (!loading && posts.length === 0)) && !hasMorePosts &&
                    <StyledP>
                        You have seen all the posts <EmojiEmotionsSharpIcon />
                    </StyledP>}
            </StyledFlex2Div>
        </StyledDisplayFlexDiv>
    );
};

export default PostsByProvider