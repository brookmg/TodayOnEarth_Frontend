/**
 * This component is used for inputting advanced search parameters
 */
import React from "react";
import Margin from "../CompoundComponents/Margin";
import ThemedCard from "../ThemedCard";
import ThemedCardTitle from "../ThemedCardTitle";
import ButtonSuccess from "../ButtonSuccess";
import { navigate } from "gatsby";
import { Collapse, CardBody, Button, FormInput, FormCheckbox } from "shards-react";
import { convertDateToInputFormat } from "../../utils";
import { StyledDisplayFlexDiv, StyledFlex1Div } from "./styles";


/**
 * 
 * @param {string} pLocations {THIS PARAMETER IS NOT USED IN THE BACKEND SINCE MOST POSTS DON'T HAVE LOCATION DATA, IT EXISTS SOLELY FOR FUTURE IMPLEMENTATION} A comma separated list of locations
 * @param {boolean} isAdvancedFilterCollapsed Provide false to hide the advanced filter section, true will show it
 * @param {string} searchTerm The term you want to search
 * @param {string} metadataTerm Data in metadata you want to search (regex can be used here)
 * @param {string} startTime Start of timeframe to start searching for posts
 * @param {string} endTime End of timeframe to stop searching for posts
 */
const AdvancedFiltersSection = ({ locations: pLocations, isAdvancedFilterCollapsed, searchTerm, metadataTerm, startTime: sTime, endTime: eTime }) => {
    const handleAdvancedFilterButtonClick = () => {
        setAdvancedFiltersCollapsed(!isAdvancedFiltersCollapsed);
    };
    const handleCheckBoxChange = (event, name) => {
        const isChecked = checkedItems[name];
        setCheckedItems({ ...checkedItems, [name]: !isChecked });
    };
    const handleStartTimeChange = (e) => { setStartTime(e.target.value); };
    const handleEndTimeChange = (e) => { setEndTime(e.target.value); };
    const handleSearchFilterTextChange = (e) => { setFilterSearchBar(e.target.value); };
    const handleMetadataFilterTextChange = (e) => { setMetadataFilter({ ...metadataFilter, [e.target.name]: e.target.value }); };
    const handleRefineClick = (event) => {
        const selectedCountries = `${Object.keys(checkedItems).filter(e => checkedItems[e])}`;
        const startTimeStamp = encodeURIComponent(startTime);
        const endTimeStamp = encodeURIComponent(endTime);
        const searchFilterSearchBarSafe = encodeURIComponent(searchFilterSearchBar || ``);
        const metadataFilterSearchBarSafe = encodeURIComponent(JSON.stringify(metadataFilter));
        const searchQuery = `expanded=1&locations=${selectedCountries}&start_time=${startTimeStamp}&end_time=${endTimeStamp}&search_term=${searchFilterSearchBarSafe}&metadata_term=${metadataFilterSearchBarSafe}`;
        console.log(searchQuery);
        navigate(`s?${searchQuery}`);
    };
    const locations = [`Africa`, `Europe`, `Asia`,];
    const initialCheckedItems = {};
    if (pLocations)
        pLocations.forEach(e => initialCheckedItems[e] = true);
    const [isAdvancedFiltersCollapsed, setAdvancedFiltersCollapsed] = React.useState(isAdvancedFilterCollapsed);
    const [searchFilterSearchBar, setFilterSearchBar] = React.useState(searchTerm);
    const [metadataFilter, setMetadataFilter] = React.useState(metadataTerm);
    const [checkedItems, setCheckedItems] = React.useState(initialCheckedItems);
    const [startTime, setStartTime] = React.useState(convertDateToInputFormat(sTime));
    const [endTime, setEndTime] = React.useState(convertDateToInputFormat(eTime || Date.now()));
    return (<div>

        <Button onClick={handleAdvancedFilterButtonClick}>
            Advanced Filters {isAdvancedFiltersCollapsed ? `🠋` : `🠉`}
        </Button>
        <Margin vertical={`1rem`}>

            <Collapse open={!isAdvancedFiltersCollapsed}>

                <ThemedCard>
                    <CardBody>
                        <Margin bottom={`1rem`}>

                            <div>
                                <ThemedCardTitle>Including the words</ThemedCardTitle>
                                <div>
                                    <FormInput value={searchFilterSearchBar} onChange={handleSearchFilterTextChange} size={`sm`} />
                                </div>

                            </div>
                        </Margin>
                        <Margin bottom={`1rem`}>

                            <div>
                                <ThemedCardTitle>Location</ThemedCardTitle>
                                <div>

                                    {locations.map(e => (<FormCheckbox inline key={e} checked={!!checkedItems[e]} onChange={ev => handleCheckBoxChange(ev, e)}>
                                        {e}
                                    </FormCheckbox>))}

                                </div>

                            </div>
                        </Margin>

                        <Margin vertical={`1rem`}>

                            <div>
                                <ThemedCardTitle>Time Period</ThemedCardTitle>
                                <div>

                                    Starting From: <FormInput value={convertDateToInputFormat(startTime)} onChange={handleStartTimeChange} type={`date`} size={`sm`} />
                                    Ending At: <FormInput value={convertDateToInputFormat(endTime)} onChange={handleEndTimeChange} type={`date`} size={`sm`} />

                                </div>

                            </div>
                        </Margin>
                        <Margin bottom={`1rem`}>

                            <div>
                                <ThemedCardTitle>Metadata search (Regex is supported)</ThemedCardTitle>

                                <StyledDisplayFlexDiv>
                                    <Margin horizontal={`0.5em`} vertical={`0.5em`}>
                                        <StyledFlex1Div>
                                            Views:<br />
                                            <FormInput placeholder={`Search views `} name={`views`} value={metadataFilter.views} onChange={handleMetadataFilterTextChange} size={`sm`} />
                                            Likes:<br />
                                            <FormInput placeholder={`Search likes `} name={`likes`} value={metadataFilter.likes} onChange={handleMetadataFilterTextChange} size={`sm`} />
                                            Replies:<br />
                                            <FormInput placeholder={`Search replies `} name={`replies`} value={metadataFilter.replies} onChange={handleMetadataFilterTextChange} size={`sm`} />
                                        </StyledFlex1Div>

                                        <StyledFlex1Div>
                                            Retweets:<br />
                                            <FormInput placeholder={`Search retweets `} name={`retweets`} value={metadataFilter.retweets} onChange={handleMetadataFilterTextChange} size={`sm`} />
                                            Comments:<br />
                                            <FormInput placeholder={`Search comments `} name={`comments`} value={metadataFilter.comments} onChange={handleMetadataFilterTextChange} size={`sm`} />
                                            Video Views:<br />
                                            <FormInput placeholder={`Search video views `} name={`video_views`} value={metadataFilter.video_views} onChange={handleMetadataFilterTextChange} size={`sm`} />
                                        </StyledFlex1Div>
                                    </Margin>
                                </StyledDisplayFlexDiv>

                            </div>
                        </Margin>

                        <div>
                            <Margin vertical={`1rem`}>
                                <ButtonSuccess onClick={handleRefineClick}>Refine search</ButtonSuccess>
                            </Margin>
                        </div>
                    </CardBody>
                </ThemedCard>

            </Collapse>
        </Margin>
    </div>);
};

export default AdvancedFiltersSection