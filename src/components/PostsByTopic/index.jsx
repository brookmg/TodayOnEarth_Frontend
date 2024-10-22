/**
 * This component is refactored from the "/trendsByTopic" page
 */
import React from "react";
import PostHolderCard from "../PostHolderCard";
import Margin from "../CompoundComponents/Margin";
import ButtonInterest from "../ButtonInterest";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { useQuery } from "@apollo/react-hooks";
import { FormCheckbox, FormInput } from "shards-react";
import {
    getIfAvailable,
    ellipsedSubstring,
    removeRedundantWhitespace,
    convertDateToInputFormat
} from "../../utils";
import { StyledColumnDiv, StyledDisplayFlexDiv, StyledLeftAlignDiv, StyledFontSizeDiv, StyledFlex1CenterDiv, StyledFlex1CenterFullWidthDiv, StyledP, StyledFlex1Div, StyledFlex2Div } from "./styles";
import { GET_POSTS_BY_TOPIC_QUERY } from "./queries";


const PostsByTopic = () => {
    const theme = React.useContext(ThemePalletteContext);
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
    const [monitoredTopics, setMonitoredTopics] = React.useState({});
    const [newTopic, setNewTopic] = React.useState(``);
    const [startTime, setStartTime] = React.useState(convertDateToInputFormat(0));
    const [endTime, setEndTime] = React.useState(convertDateToInputFormat(Date.now()));
    const [isSemanticEnabled, setIsSemanticEnabled] = React.useState(false);
    const [maxPosts, setMaxPosts] = React.useState(20);
    const handleStartTimeChange = (ev) => setStartTime(ev.target.value);
    const handleEndTimeChange = (ev) => setEndTime(ev.target.value);
    const handleMonitoredTopicsClick = (topic) => {
        setMonitoredTopics(monitoredTopics[topic]);
    };
    const handleMonitoredTopicsClose = (topic) => {
        delete monitoredTopics[topic];
        setMonitoredTopics({ ...monitoredTopics });
    };
    const handleNewTopicChange = (e) => {
        setNewTopic(e.target.value);
    };
    const handleNewTopicKeyDown = (e) => {
        if (e.key === `Enter` || e.key === ` `) {
            removeRedundantWhitespace(newTopic).
                split(` `).forEach((e) => {
                    if (!monitoredTopics[e])
                        monitoredTopics[e] = 1;
                });
            setNewTopic(``);
            e.preventDefault();
        }
    };
    const filter = [];
    if (startTime)
        filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: `AND` });
    if (endTime)
        filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: `AND` });
    const monitoredTopicsList = Object.keys(monitoredTopics);
    const variables = {
        filter,
        range: maxPosts,
        keywords: monitoredTopicsList,
        semantics: isSemanticEnabled,
        monitoredTopics,
    };
    const { loading, error, data } = useQuery(GET_POSTS_BY_TOPIC_QUERY, {
        variables
    });
    const handleSemanticChange = () => setIsSemanticEnabled(!isSemanticEnabled);
    const handleMaxPostsChange = (ev) => setMaxPosts(Number(ev.target.value));
    const posts = data && data.getPostsSortedByCustomKeywords || [];
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
                        <h2>Posts Sorted using Custom Topics</h2>
                        <StyledColumnDiv>
                            <StyledDisplayFlexDiv style={
                                isDesktopOrLaptop ? {
                                    flexDirection: `column`,
                                } : {}
                            }>
                                <Margin vertical={`1em`} horizontal={`1em`}>
                                    <div>
                                        <StyledLeftAlignDiv>
                                            <FormCheckbox toggle small checked={isSemanticEnabled} onChange={handleSemanticChange}>
                                                Enable Semantic Analysis
                                </FormCheckbox>
                                        </StyledLeftAlignDiv>

                                        <StyledLeftAlignDiv>
                                            Posts to process
                                <StyledFontSizeDiv>
                                                (Note: If semantic analysis is enabled, increasing posts count will take a very LONG time to process)
                                </StyledFontSizeDiv>
                                            <FormInput type={`number`} value={maxPosts} onChange={handleMaxPostsChange} />
                                        </StyledLeftAlignDiv>
                                    </div>

                                    <StyledFlex1CenterDiv style={isDesktopOrLaptop ? { alignSelf: `auto` } : {}}>
                                        Starting From: <FormInput value={startTime} onChange={handleStartTimeChange} type={`date`} size={`sm`} />
                            Ending At: <FormInput value={endTime} onChange={handleEndTimeChange} type={`date`} size={`sm`} />
                                    </StyledFlex1CenterDiv>
                                </Margin>
                            </StyledDisplayFlexDiv>
                            <StyledFlex1CenterFullWidthDiv>
                                <div>
                                    Monitored topics
                                </div>

                                <div>
                                    <FormInput placeholder={`Add topic`} value={newTopic} onChange={handleNewTopicChange} type={`text`} size={`sm`} plaintext={false} onKeyDown={handleNewTopicKeyDown} />
                                </div>
                                <div>
                                    <Margin vertical={`0.5em`} horizontal={`0.1em`}>
                                        {
                                            monitoredTopicsList.length ?
                                                monitoredTopicsList.map(e => <ButtonInterest key={e} onInterestClick={handleMonitoredTopicsClick} onInterestClose={handleMonitoredTopicsClose}>{e}</ButtonInterest>)
                                                : <StyledP style={{
                                                    color: theme.color_text_faded,
                                                }}>
                                                    You are not monitoring any topics
                                </StyledP>
                                        }
                                    </Margin>
                                </div>
                            </StyledFlex1CenterFullWidthDiv>

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
export default PostsByTopic