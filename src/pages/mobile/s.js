import React from "react"
import { Link, navigate } from "gatsby"
import gql from 'graphql-tag';
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { useQuery } from '@apollo/react-hooks';
import PostHolderCard from "../../components/UIElements/PostHolderCard"
import withQueryParsedURL from "../../components/HOCs/withQueryParsedURL"
import {
    Collapse, Card,
    CardTitle,
    CardBody,
    Button,
    FormInput,
    FormCheckbox
} from "shards-react";
import Margin from "../../components/CompoundComponents/Margin"
import { getIfAvailable, ellipsedSubstring } from "../../utils"

const GET_POSTS_FILTERED = gql`

query getPostsFiltered($filter: [FilterQuery!]!){
  getPostCustomized(
    jsonQuery: $filter
  ) {
    postid
    title
    body,
    provider,
    source_link
    published_on
    metadata{
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
    const handleMetadataFilterTextChange = (e) => { setMetadataFilterSearchBar(e.target.value) }

    const handleRefineClick = (event) => {
        const selectedCountries = `${Object.keys(checkedItems).filter(e => checkedItems[e])}`
        const startTimeStamp = encodeURIComponent(startTime)
        const endTimeStamp = encodeURIComponent(endTime)
        const searchFilterSearchBarSafe = encodeURIComponent(searchFilterSearchBar || "")
        const metadataFilterSearchBarSafe = encodeURIComponent(metadataFilterSearchBar || "")

        const searchQuery = `expanded=1&metadata_term=${metadataFilterSearchBarSafe}&locations=${selectedCountries}&start_time=${startTimeStamp}&end_time=${endTimeStamp}&search_term=${searchFilterSearchBarSafe}`
        console.log(searchQuery)
        navigate(`mobile/s?${searchQuery}`)
    }

    const convertDateToInputFormat = (d) => {
        const date = new Date(d)
        try {
            return date.toISOString().split('T')[0]
        }
        catch (e) {
            console.error(e)
        }
    }
    const locations = ['Africa', 'Europe', 'Asia',]

    const initialCheckedItems = {}
    if (props.locations)
        props.locations.forEach(e => initialCheckedItems[e] = true)

    const [isAdvancedFiltersCollapsed, setAdvancedFiltersCollapsed] = React.useState(props.isAdvancedFilterCollapsed);
    const [searchFilterSearchBar, setFilterSearchBar] = React.useState(props.searchTerm);
    const [metadataFilterSearchBar, setMetadataFilterSearchBar] = React.useState(props.metadataTerm || ".*");
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

                    <Card>
                        <CardBody>
                            <Margin bottom="1rem">

                                <div>
                                    <CardTitle>Including the words</CardTitle>
                                    <div>
                                        <FormInput value={searchFilterSearchBar} onChange={handleSearchFilterTextChange} size="sm" />
                                    </div>

                                </div>
                            </Margin>
                            <Margin bottom="1rem">

                                <div>
                                    <CardTitle>Location</CardTitle>
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
                                    <CardTitle>Time Period</CardTitle>
                                    <div>

                                        Starting From: <FormInput value={convertDateToInputFormat(startTime)} onChange={handleStartTimeChange} type="date" size="sm" />
                                        Ending At: <FormInput value={convertDateToInputFormat(endTime)} onChange={handleEndTimeChange} type="date" size="sm" />

                                    </div>

                                </div>
                            </Margin>
                            <Margin bottom="1rem">

                                <div>
                                    <CardTitle>Metadata search</CardTitle>
                                    <p>Use something like: </p>
                                    <pre>.*"likes"\s*:\s*"?34.*</pre>
                                    <p>The will search for posts with likes starting with 34</p>
                                    <div>
                                        <FormInput placeholder={"Search Metadata (Regex is supported)"} value={metadataFilterSearchBar} onChange={handleMetadataFilterTextChange} size="sm" />
                                    </div>

                                </div>
                            </Margin>

                            <div>
                                <Margin vertical="1rem">
                                    <Button onClick={handleRefineClick} theme="success">Refine search</Button>
                                </Margin>
                            </div>
                        </CardBody>
                    </Card>

                </Collapse>
            </Margin>
        </div>

    )

}

const SearchPage = withQueryParsedURL((props) => {
    const queryParsedURL = props.queryParsedURL

    const searchTerm = queryParsedURL.search_term
    const metadataTerm = queryParsedURL.metadata_term || ".*"
    const locations = (queryParsedURL.locations || "").split(',')
    const startTime = queryParsedURL.start_time || 0
    const endTime = queryParsedURL.end_time || 0

    const filter = [] // built dynamically, according to params provided by user

    if (searchTerm !== "") {
        filter.push({ title: searchTerm, connector: "AND" })
        filter.push({ keyword: searchTerm, connector: "AND" })
    }

    if (startTime)
        filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: "AND" })
    if (endTime)
        filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: "AND" })
    filter.push({ metadata: metadataTerm, connector: "AND" })

    // add search filter for locations
    locations.forEach(e => (e !== "") && filter.push({ keyword: e, connector: "AND" }))
    console.log(filter)
    const { loading, error, data } = useQuery(GET_POSTS_FILTERED,
        {
            variables: {
                searchTerm,
                locations,
                startTime,
                endTime,
                filter
            }
        }
    );
    const posts = (data && data.getPostCustomized) || []


    return (
        <Layout>
            <SEO title="Home" />

            <AdvancedFiltersSection
                searchTerm={searchTerm}
                locations={locations}
                startTime={startTime}
                endTime={endTime}
                metadataTerm={metadataTerm}
                isAdvancedFilterCollapsed={!queryParsedURL.expanded}
            />

            <Margin top="1em">
                <h2>Search results for: "{queryParsedURL.search_term}"</h2>
                {loading && <p>Loading Posts...</p>}
                {error && <p>Error: ${error.message}</p>}

                {
                    posts &&
                        (posts.length === 0 && !loading) ?
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

                            />)
                }
            </Margin>

            <Link to="/page-2/">Go to page 2</Link>
        </Layout>
    )
})

export default SearchPage
