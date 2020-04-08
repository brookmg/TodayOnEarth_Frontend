/**
 * This component is refactored from the "/trendsByCommunityInteraction" page
 */
import React from "react";
import PostHolderCard from "../PostHolderCard";
import Margin from "../CompoundComponents/Margin";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { FormCheckbox, FormInput } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { convertDateToInputFormat } from "../../utils";
import { getIfAvailable, ellipsedSubstring } from "../../utils";
import { StyledColumnDiv, StyledDisplayFlexDiv, StyledLeftAlignDiv, StyledFlex1CenteredDiv, StyledFlex1CenteredSpan, StyledFlex1Div, StyledFlex2Div } from "./styles";
import { RELATIVE_COMMUNITY_INTERACTION_QUERY, ABSOLUTE_COMMUNITY_INTERACTION_QUERY } from "./queries";


/* This are the initial parameters to search on the server */
const DEFAULT_COMMUNITY_INTERACTIONS = {
    'Views (t.me)': true,
    'Replies (twitter.com)': true,
    'Retweets (twitter.com)': true,
    'Comments (facebook.com, instagram.com, twitter.com)': true,
    'Likes (twitter.com, instagram.com)': true,
};

const PostsByCommunityInteraction = () => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
    const [communityInteractions, setCommunityInteractions] = React.useState(DEFAULT_COMMUNITY_INTERACTIONS);
    const [startTime, setStartTime] = React.useState(convertDateToInputFormat(0));
    const [endTime, setEndTime] = React.useState(convertDateToInputFormat(Date.now()));
    const [isRelativeInteraction, setIsRelativeInteraction] = React.useState(false);
    const [maxPosts, setMaxPosts] = React.useState(50);
    const handleStartTimeChange = (ev) => setStartTime(ev.target.value);
    const handleEndTimeChange = (ev) => setEndTime(ev.target.value);
    const filter = [];
    if (startTime)
        filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: `AND` });
    if (endTime)
        filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: `AND` });
    const variables = {
        filter,
        range: maxPosts,
        workingOn: Object.keys(communityInteractions).filter(e => communityInteractions[e]).map(e => e.split(` `)[0].toLowerCase()),
        communityInteractions,
    };
    const { loading, error, data } = useQuery(isRelativeInteraction ? RELATIVE_COMMUNITY_INTERACTION_QUERY : ABSOLUTE_COMMUNITY_INTERACTION_QUERY, {
        variables
    });
    const handleCommunityInteractionChange = (ev, name) => {
        const isChecked = communityInteractions[name];
        const newInteractions = { ...communityInteractions, [name]: !isChecked };
        setCommunityInteractions(newInteractions);
    };
    const handleRelativeInteractionChange = () => setIsRelativeInteraction(!isRelativeInteraction);
    const handleMaxPostsChange = (ev) => setMaxPosts(Number(ev.target.value));
    const posts = data && (data.getPostsSortedByCommunityInteraction || data.getPostsSortedByRelativeCommunityInteraction);
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
                        <h2>Posts Sorted using Community Interaction</h2>
                        <StyledColumnDiv>
                            <StyledDisplayFlexDiv style={
                                isDesktopOrLaptop ? {
                                    flexDirection: `column`,
                                } : {}
                            }>
                                <Margin vertical={`1em`} horizontal={`1em`}>
                                    <div>
                                        <StyledLeftAlignDiv>
                                            <FormCheckbox toggle small checked={isRelativeInteraction} onChange={handleRelativeInteractionChange}>
                                                Relative Interaction
                                            </FormCheckbox>
                                        </StyledLeftAlignDiv>

                                        <StyledLeftAlignDiv>
                                            Posts to process
                                            <FormInput type={`number`} value={maxPosts} onChange={handleMaxPostsChange} />
                                        </StyledLeftAlignDiv>
                                    </div>

                                    <StyledFlex1CenteredDiv style={isDesktopOrLaptop ? { alignSelf: `auto` } : {}}>
                                        Starting From: <FormInput value={startTime} onChange={handleStartTimeChange} type={`date`} size={`sm`} />
                                        Ending At: <FormInput value={endTime} onChange={handleEndTimeChange} type={`date`} size={`sm`} />
                                    </StyledFlex1CenteredDiv>
                                </Margin>
                            </StyledDisplayFlexDiv>
                            <StyledFlex1CenteredSpan>
                                <div>
                                    Feed sources
                </div>
                                <span>
                                    {Object.keys(communityInteractions).map(e => <FormCheckbox inline key={e} checked={!!communityInteractions[e]} onChange={ev => handleCommunityInteractionChange(ev, e)}>
                                        {e}
                                    </FormCheckbox>)}
                                </span>
                            </StyledFlex1CenteredSpan>

                        </StyledColumnDiv>
                    </div>
                </Margin>
            </StyledFlex1Div>
            <StyledFlex2Div>
                {loading && <p>Loading Posts...</p>}
                {error && <p>Error: ${error.message}</p>}

                {!loading && posts.map(p => <PostHolderCard key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, `metadata.message.image.src`) || // Telegram images
                    getIfAvailable(p, `metadata.post.thumbnail_image`) // Instagram images
                } metadata={p.metadata} />)}
            </StyledFlex2Div>
        </StyledDisplayFlexDiv>
    );
};

export default PostsByCommunityInteraction