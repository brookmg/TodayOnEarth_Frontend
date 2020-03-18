import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import ButtonSuccess from "./UIElements/ButtonSuccess";
import Margin from "./CompoundComponents/Margin";
import AuthContext from "./Contexts/AuthContext";
import ScreenSizeContext from "./Contexts/ScreenSizeContext";
import { FormTextarea, FormCheckbox, FormInput } from "shards-react";
import { Picker } from "emoji-mart";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";
import { isLoggedIn } from "../services/auth";
import { isBrowser } from "../utils";


//TODO: remove un-needed console.log()
const CREATE_POST_MUTATION = gql`

mutation createPost(
  $text: String!
  $upload: Upload
  $telegram: Boolean
  $linkedin: Boolean
  $twitter: Boolean
  $channel: String
  $facebook: Boolean
  $pageUrl: String  
) {
  postOnToSocials(
    text: $text
    upload: $upload
    telegram: $telegram
    linkedin: $linkedin
    facebook: $facebook
    pageUrl: $pageUrl  
    twitter: $twitter
    channel: $channel
  ){
    text
    facebook
    telegram
    linkedin
    twitter
    errors {
        facebook
        telegram
        linkedin
        twitter
    }  
  }
}
`;
const DEFAULT_PLATFORMS_TO_POST_ON = {
    'Telegram': true,
    'Facebook': true,
    'Instagram': false,
    'LinkedIn': true,
    'Twitter': true,
};

const StyledDisplayFlexDiv = styled.div`
    display: flex;
`

const StyledFlex1Div = styled.div`
    flex: 1;
`

const StyledDisplayFlex1Div = styled(StyledDisplayFlexDiv)`
    flex: 1;
`

const StyledFlexColumn3Div = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
`

const StyledFormTextarea = styled(FormTextarea)`
    font-family: emoji
`

const StyledFlexRowReverseDiv = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

const CreatePost = () => {
    const user = React.useContext(AuthContext);
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
    const [platformToPostOn, setPlatformToPostOn] = React.useState(DEFAULT_PLATFORMS_TO_POST_ON);
    const [postText, setPostText] = React.useState(``);
    const [telegramChannel, setTelegramChannel] = React.useState(``);
    const [facebookPageURL, setFacebookPageURL] = React.useState(``);
    const [fileToUpload, setFileToUpload] = React.useState(null);
    const [createPost, { data }] = useMutation(CREATE_POST_MUTATION);
    const handlePostTextChange = (e) => setPostText(e.target.value);
    const handleTelegramChannelChange = (e) => setTelegramChannel(e.target.value);
    const handleFacebookPageURLChange = (e) => setFacebookPageURL(e.target.value);
    const handlePostClick = () => {
        createPost({
            variables: {
                text: postText,
                upload: fileToUpload,
                telegram: platformToPostOn.Telegram,
                linkedin: platformToPostOn.LinkedIn,
                twitter: platformToPostOn.Twitter,
                facebook: platformToPostOn.Facebook,
                channel: telegramChannel,
                pageUrl: facebookPageURL,
            }
        });
    };
    const handleEmojiSelect = (emoji) => setPostText(`${postText}${emoji.native}`);
    const handlePostSourceChange = (ev, name) => {
        const isChecked = platformToPostOn[name];
        const newSources = { ...platformToPostOn, [name]: !isChecked };
        const currentKeys = Object.keys(newSources);
        if (currentKeys.length === 0)
            return;
        let isSomethingChecked = false;
        for (const e of currentKeys) {
            if (newSources[e]) {
                isSomethingChecked = true;
                break;
            }
        }
        if (!isSomethingChecked) {
            for (const e of currentKeys)
                if (e !== name)
                    newSources[e] = true;
        }
        setPlatformToPostOn(newSources);
    };
    if (isBrowser() && !isLoggedIn())
        navigate(`/app/login`);
    console.log(`GQL response`, data);
    return (<div>
        <h2>Create Post</h2>
        <StyledDisplayFlexDiv>
            <StyledFlex1Div>
                <Margin vertical={`1em`}>
                    <div>
                        Platforms to post on:
                    </div>
                </Margin>
                <span>
                    {Object.keys(platformToPostOn).map(e => <FormCheckbox inline key={e} checked={!!platformToPostOn[e]} onChange={ev => handlePostSourceChange(ev, e)}>
                        {e}
                    </FormCheckbox>)}
                    <Margin vertical={`0.25em`}>
                        {platformToPostOn.Telegram &&
                            <FormInput placeholder={`Telegram channel`} onChange={handleTelegramChannelChange} />}
                        {platformToPostOn.Facebook &&
                            <FormInput placeholder={`Facebook page URL`} onChange={handleFacebookPageURLChange} />}
                    </Margin>
                </span>
            </StyledFlex1Div>
            <StyledFlexColumn3Div>
                <Margin horizontal={`0.5em`} vertical={`0.5em`}>
                    <StyledDisplayFlex1Div>
                        <StyledFormTextarea value={postText} placeholder={`What's on your mind, ${isLoggedIn() && user.first_name}?`} rows={8} onChange={handlePostTextChange} />
                        {isDesktopOrLaptop &&
                            <Picker title={``} showPreview={true} set={`emojione`} onSelect={handleEmojiSelect} />}
                    </StyledDisplayFlex1Div>
                    <span>Image or file to upload: <FormInput type={`file`} onChange={({ target: { files } }) => {
                        const file = files[0];
                        console.log(file);
                        file && setFileToUpload(file);
                    }} /></span>
                    <StyledFlexRowReverseDiv>
                        <ButtonSuccess onClick={handlePostClick}>Create Post</ButtonSuccess>
                    </StyledFlexRowReverseDiv>
                </Margin>
            </StyledFlexColumn3Div>
        </StyledDisplayFlexDiv>

    </div>);
};

export default CreatePost