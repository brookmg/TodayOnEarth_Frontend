import React from "react";
import gql from 'graphql-tag';
import styled from "styled-components";
import PostHolderCard from './UIElements/PostHolderCard';
import Margin from "./CompoundComponents/Margin";
import { FormCheckbox, FormInput } from "shards-react";
import { useQuery } from '@apollo/react-hooks';
import { convertDateToInputFormat } from "../utils";
import { getIfAvailable, ellipsedSubstring } from '../utils';


const ABSOLUTE_COMMUNITY_INTERACTION_QUERY = gql`

query getPostsByAbsoluteCommunityInteraction(
  $filter: [FilterQuery!]!
  $range: Int
  $semantics: Boolean
  $workingOn: [String!]!
) {
  getPostsSortedByCommunityInteraction(
    page: 0
    jsonQuery: $filter
    range: $range
    semantics: $semantics
    workingOn: $workingOn
  ) {
      postid,
      title,
      provider,
      source_link,
      published_on,
      metadata {
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
      },
    }
}
`;
const RELATIVE_COMMUNITY_INTERACTION_QUERY = gql`

query getPostsByRelativeCommunityInteraction(
  $filter: [FilterQuery!]!
  $range: Int
  $semantics: Boolean
  $workingOn: [String!]!
) {
  getPostsSortedByRelativeCommunityInteraction(
    page: 0
    jsonQuery: $filter
    range: $range
    semantics: $semantics
    workingOn: $workingOn
  ) {
      postid,
      title,
      provider,
      source_link,
      published_on,
      metadata {
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
      },
    }
}
`;
const DEFAULT_COMMUNITY_INTERACTIONS = {
    "Views (t.me)": true,
    "Replies (twitter.com)": true,
    "Retweets (twitter.com)": true,
    "Comments (facebook.com, instagram.com )": true,
    "Likes (twitter.com, instagram.com)": true,
};

const StyledFlexDiv = styled.div`
  display: flex;
`

const StyledColumnDiv = styled(StyledFlexDiv)`
  flex-direction: column;
`

const StyledLeftAlignDiv = styled.div`
    text-align: left
`

const StyledFlex1CenteredDiv = styled.div`
    flex: 1;
    align-self: center;
`

const StyledFlex1CenteredSpan = styled.span`
    flex: 1;
    align-self: center;
`

const PostsByCommunityInteraction = (props) => {
    const [communityInteractions, setCommunityInteractions] = React.useState(DEFAULT_COMMUNITY_INTERACTIONS);
    const [startTime, setStartTime] = React.useState(convertDateToInputFormat(0));
    const [endTime, setEndTime] = React.useState(convertDateToInputFormat(Date.now()));
    const [isRelativeInteraction, setIsRelativeInteraction] = React.useState(false);
    const [maxPosts, setMaxPosts] = React.useState(50);
    const handleStartTimeChange = (ev) => setStartTime(ev.target.value);
    const handleEndTimeChange = (ev) => setEndTime(ev.target.value);
    const filter = [];
    if (startTime)
        filter.push({ published_on: `${new Date(startTime).getTime()}`, connector: "AND" });
    if (endTime)
        filter.push({ _published_on: `${new Date(endTime).getTime()}`, connector: "AND" });
    const variables = {
        filter,
        range: maxPosts,
        workingOn: Object.keys(communityInteractions).filter(e => communityInteractions[e]).map(e => e.split(" ")[0].toLowerCase()),
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
        <div>
            <h2>Posts Sorted using Community Interaction</h2>
            <StyledColumnDiv>
                <StyledFlexDiv>
                    <Margin vertical="1em" horizontal="1em">
                        <div>
                            <StyledLeftAlignDiv>
                                <FormCheckbox toggle small checked={isRelativeInteraction} onChange={handleRelativeInteractionChange}>
                                    Relative Interaction
                          </FormCheckbox>
                            </StyledLeftAlignDiv>

                            <StyledLeftAlignDiv>
                                Posts to process
                            <FormInput type="number" value={maxPosts} onChange={handleMaxPostsChange} />
                            </StyledLeftAlignDiv>
                        </div>

                        <StyledFlex1CenteredDiv>
                            Starting From: <FormInput value={startTime} onChange={handleStartTimeChange} type="date" size="sm" />
                            Ending At: <FormInput value={endTime} onChange={handleEndTimeChange} type="date" size="sm" />
                        </StyledFlex1CenteredDiv>
                    </Margin>
                </StyledFlexDiv>
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
            {loading && <p>Loading Posts...</p>}
            {error && <p>Error: ${error.message}</p>}

            {!loading && posts.map(p => <PostHolderCard key={p.source_link} id={p.postid} title={ellipsedSubstring(p.title, 200)} body={p.body} sourceLink={p.source_link} imgSrc={getIfAvailable(p, `metadata.message.image.src`) || // Telegram images
                getIfAvailable(p, `metadata.post.thumbnail_image`) // Instagram images
            } metadata={p.metadata} />)}

        </div>
    );
};

export default PostsByCommunityInteraction