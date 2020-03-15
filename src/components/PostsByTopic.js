import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { getIfAvailable, ellipsedSubstring, removeRedundantWhitespace } from '../utils';
import PostHolderCard from './UIElements/PostHolderCard';
import { FormCheckbox, FormInput } from "shards-react";
import Margin from "./CompoundComponents/Margin";
import { convertDateToInputFormat } from "../utils";
import ButtonInterest from "./UIElements/ButtonInterest";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import styled from "styled-components";


const GET_POSTS_BY_TOPIC_QUERY = gql`


query getPostsByTopic(
  $filter: [FilterQuery!]!
  $range: Int
  $semantics: Boolean
  $keywords: [String!]!
) {
  getPostsSortedByCustomKeywords(
    page: 0
    jsonQuery: $filter
    range: $range
    semantics: $semantics
    keywords: $keywords
  ) {
    postid
    title
    provider
    source_link
    published_on
    metadata {
      community_interaction {
        views
        likes
        replies
        retweets
        comments
        video_views
      }

      ... on TelegramMetadata {
        message {
          image {
            src
          }
        }
      }
      ... on InstagramMetadata {
        post {
          thumbnail_image
        }
      }
    }
  }
}
`;

const StyledDisplayFlexDiv = styled.div`
    display: flex; 
`

const StyledColumnDiv = styled(StyledDisplayFlexDiv)`
    display: flex; 
    flex-direction: column;
`

const StyledLeftAlignDiv = styled.div`
    text-align: left;
`

const StyledFontSizeDiv = styled.div`
    font-size: 0.5em;
`

const StyledFlex1CenterDiv = styled.div`
    flex: 1;
    align-self: center;
`

const StyledFlex1CenterFullWidthDiv = styled(StyledFlex1CenterDiv)`
    width: 100%;
`

const StyledP = styled.p`
    text-align: center;
`

const PostsByTopic = (props) => {
    const theme = React.useContext(ThemePalletteContext);
    const [monitoredTopics, setMonitoredTopics] = React.useState({});
    const [newTopic, setNewTopic] = React.useState("");
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
        if (e.key === 'Enter' || e.key === ' ') {
            removeRedundantWhitespace(newTopic).
                split(" ").forEach((e) => {
                    if (!monitoredTopics[e])
                        monitoredTopics[e] = 1;
                });
            setNewTopic("");
            e.preventDefault();
        }
    };
    const filter = [];
    if (startTime)
        filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: "AND" });
    if (endTime)
        filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: "AND" });
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
        <div>
            <h2>Posts Sorted using Custom Topics</h2>
            <StyledColumnDiv>
                <StyledDisplayFlexDiv>
                    <Margin vertical="1em" horizontal="1em">
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
                                <FormInput type="number" value={maxPosts} onChange={handleMaxPostsChange} />
                            </StyledLeftAlignDiv>
                        </div>

                        <StyledFlex1CenterDiv>
                            Starting From: <FormInput value={startTime} onChange={handleStartTimeChange} type="date" size="sm" />
                            Ending At: <FormInput value={endTime} onChange={handleEndTimeChange} type="date" size="sm" />
                        </StyledFlex1CenterDiv>
                    </Margin>
                </StyledDisplayFlexDiv>
                <StyledFlex1CenterFullWidthDiv>
                    <div>
                        Monitored topics
                    </div>
                    <div>
                        <FormInput placeholder={"Add topic"} value={newTopic} onChange={handleNewTopicChange} type="text" size="sm" plaintext={false} onKeyDown={handleNewTopicKeyDown} />
                    </div>
                    <div>
                        <Margin vertical="0.5em">
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
            {loading && <p>Loading Posts...</p>}
            {error && <p>Error: ${error.message}</p>}

            {!loading && posts.map(p => <PostHolderCard key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, 'metadata.message.image.src') || // Telegram images
                getIfAvailable(p, 'metadata.post.thumbnail_image') // Instagram images
            } metadata={p.metadata} />)}

        </div>
    );
};
export default PostsByTopic