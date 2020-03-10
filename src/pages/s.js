import React from "react"
import { navigate } from "gatsby"
import gql from 'graphql-tag';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useQuery } from '@apollo/react-hooks';
import PostHolderCard from "../components/UIElements/PostHolderCard"
import withQueryParsedURL from "../components/HOCs/withQueryParsedURL"
import {
    Collapse,
    CardBody,
    Button,
    FormInput,
    FormCheckbox,
    FormSelect
} from "shards-react";
import Margin from "../components/CompoundComponents/Margin"
import { getIfAvailable, ellipsedSubstring, isBrowser } from "../utils"
import ThemedCard from "../components/UIElements/ThemedCard";
import ThemedCardTitle from "../components/UIElements/ThemedCardTitle";
import ButtonSuccess from "../components/UIElements/ButtonSuccess";
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';
import { convertDateToInputFormat } from "../utils"


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


const DEFAULT_POST_COUNT_PER_PAGE = 5
const DEFAULT_POST_SOURCES = {
    "t.me": true,
    "facebook.com": true,
    "instagram.com": true,
    "twitter.com": true
}

const AdvancedFiltersSection = (props) => {
    const handleAdvancedFilterButtonClick = () => {
        setAdvancedFiltersCollapsed(!isAdvancedFiltersCollapsed)
    }

    const handleCheckBoxChange = (event, name) => {

        const isChecked = checkedItems[name]

        setCheckedItems({ ...checkedItems, [name]: !isChecked });
    }

    const handleStartTimeChange = (e) => { setStartTime(e.target.value) }
    const handleEndTimeChange = (e) => { setEndTime(e.target.value) }
    const handleSearchFilterTextChange = (e) => { setFilterSearchBar(e.target.value) }
    const handleMetadataFilterTextChange = (e) => { setMetadataFilter({ ...metadataFilter, [e.target.name]: e.target.value }) }

    const handleRefineClick = (event) => {
        const selectedCountries = `${Object.keys(checkedItems).filter(e => checkedItems[e])}`
        const startTimeStamp = encodeURIComponent(startTime)
        const endTimeStamp = encodeURIComponent(endTime)
        const searchFilterSearchBarSafe = encodeURIComponent(searchFilterSearchBar || "")
        const metadataFilterSearchBarSafe = encodeURIComponent(JSON.stringify(metadataFilter))

        const searchQuery = `expanded=1&locations=${selectedCountries}&start_time=${startTimeStamp}&end_time=${endTimeStamp}&search_term=${searchFilterSearchBarSafe}&metadata_term=${metadataFilterSearchBarSafe}`
        console.log(searchQuery)
        navigate(`s?${searchQuery}`)
    }

    const locations = ['Africa', 'Europe', 'Asia',]

    const initialCheckedItems = {}
    if (props.locations)
        props.locations.forEach(e => initialCheckedItems[e] = true)

    const [isAdvancedFiltersCollapsed, setAdvancedFiltersCollapsed] = React.useState(props.isAdvancedFilterCollapsed);
    const [searchFilterSearchBar, setFilterSearchBar] = React.useState(props.searchTerm);
    const [metadataFilter, setMetadataFilter] = React.useState(props.metadataTerm);
    const [checkedItems, setCheckedItems] = React.useState(initialCheckedItems);
    const [startTime, setStartTime] = React.useState(convertDateToInputFormat(props.startTime));
    const [endTime, setEndTime] = React.useState(convertDateToInputFormat(props.endTime || Date.now()));

    return (
        <div>

            <Button
                onClick={handleAdvancedFilterButtonClick}>
                Advanced Filters {isAdvancedFiltersCollapsed ? `🠋` : `🠉`}
            </Button>
            <Margin vertical="1rem">

                <Collapse open={!isAdvancedFiltersCollapsed}>

                    <ThemedCard>
                        <CardBody>
                            <Margin bottom="1rem">

                                <div>
                                    <ThemedCardTitle>Including the words</ThemedCardTitle>
                                    <div>
                                        <FormInput value={searchFilterSearchBar} onChange={handleSearchFilterTextChange} size="sm" />
                                    </div>

                                </div>
                            </Margin>
                            <Margin bottom="1rem">

                                <div>
                                    <ThemedCardTitle>Location</ThemedCardTitle>
                                    <div>

                                        {
                                            locations.map(e => (
                                                <FormCheckbox
                                                    inline
                                                    key={e}
                                                    checked={!!checkedItems[e]}
                                                    onChange={ev => handleCheckBoxChange(ev, e)}
                                                >
                                                    {e}
                                                </FormCheckbox>

                                            ))
                                        }

                                    </div>

                                </div>
                            </Margin>

                            <Margin vertical="1rem">

                                <div>
                                    <ThemedCardTitle>Time Period</ThemedCardTitle>
                                    <div>

                                        Starting From: <FormInput value={convertDateToInputFormat(startTime)} onChange={handleStartTimeChange} type="date" size="sm" />
                                        Ending At: <FormInput value={convertDateToInputFormat(endTime)} onChange={handleEndTimeChange} type="date" size="sm" />

                                    </div>

                                </div>
                            </Margin>
                            <Margin bottom="1rem">

                                <div>
                                    <ThemedCardTitle>Metadata search (Regex is supported)</ThemedCardTitle>

                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <Margin horizontal="0.5em" vertical="0.5em">
                                            <div style={{ flex: 1 }}>
                                                Views:<br />
                                                <FormInput placeholder={"Search views "} name="views" value={metadataFilter.views} onChange={handleMetadataFilterTextChange} size="sm" />
                                                Likes:<br />
                                                <FormInput placeholder={"Search likes "} name="likes" value={metadataFilter.likes} onChange={handleMetadataFilterTextChange} size="sm" />
                                                Replies:<br />
                                                <FormInput placeholder={"Search replies "} name="replies" value={metadataFilter.replies} onChange={handleMetadataFilterTextChange} size="sm" />
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                Retweets:<br />
                                                <FormInput placeholder={"Search retweets "} name="retweets" value={metadataFilter.retweets} onChange={handleMetadataFilterTextChange} size="sm" />
                                                Comments:<br />
                                                <FormInput placeholder={"Search comments "} name="comments" value={metadataFilter.comments} onChange={handleMetadataFilterTextChange} size="sm" />
                                                Video Views:<br />
                                                <FormInput placeholder={"Search video views "} name="video_views" value={metadataFilter.video_views} onChange={handleMetadataFilterTextChange} size="sm" />
                                            </div>
                                        </Margin>
                                    </div>

                                </div>
                            </Margin>

                            <div>
                                <Margin vertical="1rem">
                                    <ButtonSuccess onClick={handleRefineClick}>Refine search</ButtonSuccess>
                                </Margin>
                            </div>
                        </CardBody>
                    </ThemedCard>

                </Collapse>
            </Margin>
        </div>

    )

}

let prevScrollValue = -1

const PostsSearch = withQueryParsedURL((props) => {
    const queryParsedURL = props.queryParsedURL

    const searchTerm = queryParsedURL.search_term
    const metadataTerm = queryParsedURL.metadata_term || ""
    const locations = (queryParsedURL.locations || "").split(',')
    const startTime = queryParsedURL.start_time || 0
    const endTime = queryParsedURL.end_time || 0

    const [pageNumber, setPageNumber] = React.useState(0)
    const [postsPerPage, setPostsPerPage] = React.useState(DEFAULT_POST_COUNT_PER_PAGE)
    const [hasMorePosts, setHasMorePosts] = React.useState(true)
    const [posts, setPosts] = React.useState([])
    const [postSources, setPostSources] = React.useState(DEFAULT_POST_SOURCES)

    const filter = [] // built dynamically, according to params provided by user

    if (searchTerm !== "") {
        filter.push({ title: searchTerm, connector: "AND" })
        filter.push({ keyword: searchTerm, connector: "AND" })
    }

    if (startTime)
        filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: "AND" })
    if (endTime)
        filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: "AND" })

    if (metadataTerm) {
        const metadataObj = JSON.parse(metadataTerm);

        Object.keys(metadataObj).forEach((key) => {
            const value = metadataObj[key]

            if (metadataObj.hasOwnProperty(key) && isNaN(key) && value) {
                const searchTerm = `.*"${key}"\s*:\s*"?${value}"?`
                filter.push({ metadata: searchTerm, connector: "AND" })
            }
        });
    }


    // add search filter for locations
    locations.forEach(e => (e !== "") && filter.push({ keyword: e, connector: "AND" }))

    let checkedItemsCount = 0
    let sourceFilter = ""
    for (const e of Object.keys(postSources)) {
        if (postSources[e]) {
            checkedItemsCount++
            sourceFilter = e
        }
    }

    if (checkedItemsCount === 1)
        filter.push({ source: sourceFilter, connector: "AND" })

    const handleNewData = (data) => {
        setHasMorePosts(true)
        if (data && data.getPostCustomized) {
            if (data.getPostCustomized.length !== 0)
                setPosts([...posts, ...data.getPostCustomized])
            else
                setHasMorePosts(false)
        }
    }

    console.log(filter)
    const { loading, error } = useQuery(GET_POSTS_FILTERED,
        {
            variables: {
                page: pageNumber,
                postsPerPage: postsPerPage,

                filter
            },
            onCompleted: handleNewData,
            notifyOnNetworkStatusChange: true,
            fetchPolicy: "cache-and-network"
        }
    );

    const scrollValue = props.scrollValue
    const height = props.height

    if (posts.length && scrollValue !== 0 && scrollValue >= height && hasMorePosts) {
        if (prevScrollValue !== scrollValue)
            setPageNumber(pageNumber + 1)

        prevScrollValue = scrollValue
    }


    const resetPosts = () => {
        setPosts([])
        setPageNumber(0)
    }

    const handlePostsPerPageChange = (e) => {
        const count = Number(e.target.value)

        resetPosts()
        setPostsPerPage(count)
    }

    const handlePostSourceChange = (ev, name) => {
        const isChecked = postSources[name]
        const newSources = { ...postSources, [name]: !isChecked }

        const currentKeys = Object.keys(newSources)
        if (currentKeys.length === 0)
            return;

        let checkedCount = 0
        for (const e of currentKeys) {
            if (newSources[e])
                checkedCount++
        }

        for (const e of currentKeys) {
            if (!checkedCount)
                newSources[e] = true
            else
                newSources[e] = false
        }
        newSources[name] = true

        resetPosts()
        setPostSources(newSources);
    }

    return (
        <div scrollValue={scrollValue} height={height} >
            <AdvancedFiltersSection
                searchTerm={searchTerm}
                locations={locations}
                startTime={startTime}
                endTime={endTime}
                metadataTerm={metadataTerm}
                isAdvancedFilterCollapsed={!queryParsedURL.expanded}
            />

            <Margin top="1em">
                <div>
                    <div style={{ display: "flex" }}>
                        <span style={{ flex: 1, alignSelf: 'center' }}>
                            <div>
                                Feed sources
                                            </div>
                            <span>
                                {
                                    Object.keys(postSources).map(
                                        e => <FormCheckbox
                                            inline
                                            key={e}
                                            checked={!!postSources[e]}
                                            onChange={ev => handlePostSourceChange(ev, e)}
                                        >
                                            {e}
                                        </FormCheckbox>
                                    )
                                }
                            </span>
                        </span>

                        <div>
                            <label>
                                Posts per page:
<FormSelect size="sm" onChange={handlePostsPerPageChange}>
                                    {[DEFAULT_POST_COUNT_PER_PAGE, 10, 20, 100].map((e, i) => (
                                        <option key={i} value={e}>
                                            {e}
                                        </option>
                                    ))}
                                </FormSelect>
                            </label>
                        </div>
                    </div>
                    <h2>Search results for: "{queryParsedURL.search_term}"</h2>
                    {
                        posts &&
                            (posts.length === 0 && !loading && !hasMorePosts) ?
                            <p>Nothing found :(</p>
                            :
                            posts.map(
                                p => <PostHolderCard
                                    key={p.postid}

                                    id={p.postid}

                                    title={ellipsedSubstring(p.title, 200)}
                                    body={p.body}
                                    sourceLink={p.source_link}
                                    imgSrc={
                                        getIfAvailable(p, 'metadata.message.image.src') || // Telegram images
                                        getIfAvailable(p, 'metadata.post.thumbnail_image') // Instagram images
                                    }
                                    metadata={p.metadata}

                                />)
                    }
                    {loading && <p>Loading Posts...</p>}
                    {error && <p>Error: ${error.message}</p>}
                    {
                        !hasMorePosts &&
                        <p style={{
                            textAlign: "center"
                        }}>
                            You have seen all the posts <EmojiEmotionsSharpIcon />
                        </p>
                    }
                </div>
            </Margin>
        </div>
    )
})

const SearchPage = () => {
    return (
        <Layout render={
            ({ scrollValue, height }) => {
                return (
                    <>
                        <SEO title="Home" />
                        <PostsSearch scrollValue={scrollValue} height={height} />
                    </>
                )
            }}>

        </Layout>
    )
}

export default SearchPage;