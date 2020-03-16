import React from "react";
import styled from "styled-components";
import Margin from "./CompoundComponents/Margin";
import ThemedCard from "./UIElements/ThemedCard";
import ThemedCardTitle from "./UIElements/ThemedCardTitle";
import ButtonSuccess from "./UIElements/ButtonSuccess";
import { navigate } from "gatsby";
import { Collapse, CardBody, Button, FormInput, FormCheckbox } from "shards-react";
import { convertDateToInputFormat } from "../utils";


const StyledDisplayFlexDiv = styled.div`
    display: flex;
`

const StyledFlex1Div = styled.div`
    flex: 1;
`

const AdvancedFiltersSection = (props) => {
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
        const searchFilterSearchBarSafe = encodeURIComponent(searchFilterSearchBar || "");
        const metadataFilterSearchBarSafe = encodeURIComponent(JSON.stringify(metadataFilter));
        const searchQuery = `expanded=1&locations=${selectedCountries}&start_time=${startTimeStamp}&end_time=${endTimeStamp}&search_term=${searchFilterSearchBarSafe}&metadata_term=${metadataFilterSearchBarSafe}`;
        console.log(searchQuery);
        navigate(`s?${searchQuery}`);
    };
    const locations = ['Africa', 'Europe', 'Asia',];
    const initialCheckedItems = {};
    if (props.locations)
        props.locations.forEach(e => initialCheckedItems[e] = true);
    const [isAdvancedFiltersCollapsed, setAdvancedFiltersCollapsed] = React.useState(props.isAdvancedFilterCollapsed);
    const [searchFilterSearchBar, setFilterSearchBar] = React.useState(props.searchTerm);
    const [metadataFilter, setMetadataFilter] = React.useState(props.metadataTerm);
    const [checkedItems, setCheckedItems] = React.useState(initialCheckedItems);
    const [startTime, setStartTime] = React.useState(convertDateToInputFormat(props.startTime));
    const [endTime, setEndTime] = React.useState(convertDateToInputFormat(props.endTime || Date.now()));
    return (<div>

        <Button onClick={handleAdvancedFilterButtonClick}>
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

                                    {locations.map(e => (<FormCheckbox inline key={e} checked={!!checkedItems[e]} onChange={ev => handleCheckBoxChange(ev, e)}>
                                        {e}
                                    </FormCheckbox>))}

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

                                <StyledDisplayFlexDiv>
                                    <Margin horizontal="0.5em" vertical="0.5em">
                                        <StyledFlex1Div>
                                            Views:<br />
                                            <FormInput placeholder={"Search views "} name="views" value={metadataFilter.views} onChange={handleMetadataFilterTextChange} size="sm" />
                                            Likes:<br />
                                            <FormInput placeholder={"Search likes "} name="likes" value={metadataFilter.likes} onChange={handleMetadataFilterTextChange} size="sm" />
                                            Replies:<br />
                                            <FormInput placeholder={"Search replies "} name="replies" value={metadataFilter.replies} onChange={handleMetadataFilterTextChange} size="sm" />
                                        </StyledFlex1Div>

                                        <StyledFlex1Div>
                                            Retweets:<br />
                                            <FormInput placeholder={"Search retweets "} name="retweets" value={metadataFilter.retweets} onChange={handleMetadataFilterTextChange} size="sm" />
                                            Comments:<br />
                                            <FormInput placeholder={"Search comments "} name="comments" value={metadataFilter.comments} onChange={handleMetadataFilterTextChange} size="sm" />
                                            Video Views:<br />
                                            <FormInput placeholder={"Search video views "} name="video_views" value={metadataFilter.video_views} onChange={handleMetadataFilterTextChange} size="sm" />
                                        </StyledFlex1Div>
                                    </Margin>
                                </StyledDisplayFlexDiv>

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
    </div>);
};

export default AdvancedFiltersSection