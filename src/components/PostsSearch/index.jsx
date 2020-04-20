/**
 * This component is refactored from the "/s" page
 */
import React from "react";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "../PostHolderCard";
import withQueryParsedURL from "../HOCs/withQueryParsedURL";
import Margin from "../CompoundComponents/Margin";
import AdvancedFiltersSection from "../AdvancedFiltersSection";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { FormCheckbox, FormSelect } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledDisplayFlexDiv, StyledFlex1CenterSpan, StyledP, StyledFlex1Div, StyledFlex2Div } from "./styles";
import { GET_POSTS_FILTERED } from "./queries";


/* How many posts to show initially */
const DEFAULT_POST_COUNT_PER_PAGE = 5;

/* Previous frame's isBottomReached value */
let prevIsBottomReached = false

const DEFAULT_POST_SOURCES = {
    't.me': true,
    'facebook.com': true,
    'instagram.com': true,
    'twitter.com': true
};

/**
 * 
 * @param {object} queryParsedURL The parsed query string of the current URL
 * @param {boolean} isBottomReached Will be set to true if bottom of page is reached
 */
const PostsSearch = withQueryParsedURL(
    ({ queryParsedURL, isBottomReached }) => {
        const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
        const searchTerm = queryParsedURL.search_term;
        const metadataTerm = queryParsedURL.metadata_term || ``;
        const locations = (queryParsedURL.locations || ``).split(`,`);
        const startTime = queryParsedURL.start_time || 0;
        const endTime = queryParsedURL.end_time || 0;
        const [pageNumber, setPageNumber] = React.useState(0);
        const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE);
        const [hasMorePosts, setHasMorePosts] = React.useState(true);
        const [posts, setPosts] = React.useState([]);
        const [postSources, setPostSources] = React.useState(DEFAULT_POST_SOURCES);
        const filter = []; // built dynamically, according to params provided by user
        if (searchTerm && searchTerm !== ``) {
            filter.push({ title: searchTerm, connector: `AND` });
            filter.push({ keyword: searchTerm, connector: `AND` });
        }
        if (startTime)
            filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: `AND` });
        if (endTime)
            filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: `AND` });
        if (metadataTerm) {
            const metadataObj = JSON.parse(metadataTerm);
            Object.keys(metadataObj).forEach((key) => {
                const value = metadataObj[key];
                if (metadataObj.hasOwnProperty(key) && isNaN(key) && value) {
                    const searchTerm = `.*"${key}"\s*:\s*"?${value}"?`;
                    filter.push({ metadata: searchTerm, connector: `AND` });
                }
            });
        }
        // add search filter for locations
        locations.forEach(e => (e !== ``) && filter.push({ keyword: e, connector: `AND` }));
        let checkedItemsCount = 0;
        let sourceFilter = ``;
        for (const e of Object.keys(postSources)) {
            if (postSources[e]) {
                checkedItemsCount++;
                sourceFilter = e;
            }
        }
        if (checkedItemsCount === 1)
            filter.push({ source: sourceFilter, connector: `AND` });
        const handleNewData = (data) => {
            setHasMorePosts(true);
            if (data && data.getPostCustomized) {
                if (data.getPostCustomized.length !== 0)
                    setPosts([...posts, ...data.getPostCustomized]);
                else
                    setHasMorePosts(false);
            }
        };
        console.log(filter);
        const { loading, error } = useQuery(GET_POSTS_FILTERED, {
            variables: {
                page: pageNumber,
                postsPerPage: postsPerPage,
                filter
            },
            skip: (!searchTerm || searchTerm === ""),
            onCompleted: handleNewData,
            notifyOnNetworkStatusChange: true,
            fetchPolicy: `cache-and-network`
        });

        if (posts.length && prevIsBottomReached !== isBottomReached && isBottomReached && hasMorePosts) {
            setPageNumber(pageNumber + 1);
        }
        prevIsBottomReached = isBottomReached

        const resetPosts = () => {
            setPosts([]);
            setPageNumber(0);
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
            let checkedCount = 0;
            for (const e of currentKeys) {
                if (newSources[e])
                    checkedCount++;
            }
            for (const e of currentKeys) {
                if (!checkedCount)
                    newSources[e] = true;
                else
                    newSources[e] = false;
            }
            newSources[name] = true;
            resetPosts();
            setPostSources(newSources);
        };
        return (
            <StyledDisplayFlexDiv isBottomReached={isBottomReached} style={{ flexDirection: isDesktopOrLaptop ? `row-reverse` : `column` }}>
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
                            <div>
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
                            <AdvancedFiltersSection
                                searchTerm={searchTerm}
                                locations={locations}
                                startTime={startTime}
                                endTime={endTime}
                                metadataTerm={metadataTerm}
                                isAdvancedFilterCollapsed={!Number(queryParsedURL.expanded)} />
                        </div>
                    </Margin>
                </StyledFlex1Div>
                <StyledFlex2Div>
                    {
                        (searchTerm && searchTerm !== "") ?
                            <h2>Search results for: "{searchTerm}"</h2> :
                            <h2>Type in a search term and click "Refine Search" </h2>
                    }
                    {posts &&
                        (posts.length === 0 && !loading && !hasMorePosts) ?
                        <p>Nothing found :(</p>
                        :
                        posts.map(p => <PostHolderCard key={p.postid} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, `metadata.message.image.src`) || // Telegram images
                            getIfAvailable(p, `metadata.post.thumbnail_image`) // Instagram images
                        } metadata={p.metadata} />)}
                    {loading && <p>Loading Posts...</p>}
                    {error && <p>Error: ${error.message}</p>}
                    {!hasMorePosts &&
                        <StyledP>
                            You have seen all the posts <EmojiEmotionsSharpIcon />
                        </StyledP>
                    }
                </StyledFlex2Div>
            </StyledDisplayFlexDiv>
        );
    }
);

export default PostsSearch