import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

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

    const handleRefineClick = (event) => {
        const selectedCountries = `${Object.keys(checkedItems).filter(e => checkedItems[e])}`
        const startTimeStamp = encodeURIComponent(startTime)
        const endTimeStamp = encodeURIComponent(endTime)
        const searchFilterSearchBarSafe = encodeURIComponent(searchFilterSearchBar || "")

        const searchQuery = `expanded=1&locations=${selectedCountries}&start_time=${startTimeStamp}&end_time=${endTimeStamp}&search_term=${searchFilterSearchBarSafe}`
        console.log(searchQuery)
        window.open(`s?${searchQuery}`, "_self")
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
        props.locations.split(',').forEach(e => initialCheckedItems[e] = true)

    const [isAdvancedFiltersCollapsed, setAdvancedFiltersCollapsed] = React.useState(props.isAdvancedFilterCollapsed);
    const [searchFilterSearchBar, setFilterSearchBar] = React.useState(props.searchTerm);
    const [checkedItems, setCheckedItems] = React.useState(initialCheckedItems);
    const [startTime, setStartTime] = React.useState(props.startTime);
    const [endTime, setEndTime] = React.useState(props.endTime);

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
    return (
        <Layout>
            <SEO title="Home" />

            <AdvancedFiltersSection
                searchTerm={queryParsedURL.search_term}
                locations={queryParsedURL.locations}
                startTime={queryParsedURL.start_time}
                endTime={queryParsedURL.end_time}
                isAdvancedFilterCollapsed={!queryParsedURL.expanded}
            />

            <Margin top="1em">
                <h2>Search results for: "{queryParsedURL.search_term}"</h2>
                <PostHolderCard />
            </Margin>

            <Link to="/page-2/">Go to page 2</Link>
        </Layout>
    )
})

export default SearchPage
