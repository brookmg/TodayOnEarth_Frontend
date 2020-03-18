import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import EmojiEmotionsSharpIcon from "@material-ui/icons/EmojiEmotionsSharp";
import PostHolderCard from "./PostHolderCard";
import withQueryParsedURL from "./HOCs/withQueryParsedURL";
import Margin from "./CompoundComponents/Margin";
import AdvancedFiltersSection from "./AdvancedFiltersSection";
import { FormCheckbox, FormSelect } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { getIfAvailable, ellipsedSubstring } from "../utils";


const GET_POSTS_FILTERED = gql`

query getPaginatedPostsFiltered(
  $page: Int
  $postsPerPage: Int
  $filter: [FilterQuery!]!
) {
  getPostCustomized(page: $page, range: $postsPerPage, jsonQuery: $filter) {
    postid
    title
    body,
    provider,
    source_link
    published_on
    metadata{
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
    }
    keywords{
      keyword
    }
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

const PostsSearch = withQueryParsedURL(({ queryParsedURL, scrollValue, height }) => {
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
    if (searchTerm !== ``) {
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
    return (<div scrollValue={scrollValue} height={height}>
        <AdvancedFiltersSection
            searchTerm={searchTerm}
            locations={locations}
            startTime={startTime}
            endTime={endTime}
            metadataTerm={metadataTerm}
            isAdvancedFilterCollapsed={!queryParsedURL.expanded} />

        <Margin top={`1em`}>
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
                <h2>Search results for: "{queryParsedURL.search_term}"</h2>
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
            </div>
        </Margin>
    </div>);
});

export default PostsSearch