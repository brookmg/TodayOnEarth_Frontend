/**
 * This component is used to create posts
 * 
 * Note: User needs to be logged in for this page to work as intended
 */
import React from "react";
import ButtonSuccess from "../ButtonSuccess";
import Margin from "../CompoundComponents/Margin";
import AuthContext from "../../contexts/AuthContext";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { FormCheckbox, FormInput } from "shards-react";
import { Picker } from "emoji-mart";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/auth";
import { isBrowser } from "../../utils";
import { StyledDisplayFlexDiv, StyledFlex1Div, StyledFlexColumn3Div, StyledDisplayFlex1Div, StyledFormTextarea, StyledFlexRowReverseDiv } from "./styles";
import { CREATE_POST_MUTATION } from "./queries";


const CreatePost = () => {
    const user = React.useContext(AuthContext);
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
    const authEndpoint = process.env.GATSBY_AUTH_ENDPOINT
    const [platformToPostOn, setPlatformToPostOn] = React.useState({
        'Facebook': Boolean(user.facebook_id),
        'LinkedIn': Boolean(user.linkedin_id),
        'Twitter': Boolean(user.twitter_id),
    });
    const [postText, setPostText] = React.useState(``);
    const [facebookPageURL, setFacebookPageURL] = React.useState(``);
    const [fileToUpload, setFileToUpload] = React.useState(null);
    const [createPost, { data }] = useMutation(CREATE_POST_MUTATION);
    const handlePostTextChange = (e) => setPostText(e.target.value);
    const handleFacebookPageURLChange = (e) => setFacebookPageURL(e.target.value);
    const handlePostClick = () => {
        createPost({
            variables: {
                text: postText,
                upload: fileToUpload,
                telegram: false,
                linkedin: platformToPostOn.LinkedIn,
                twitter: platformToPostOn.Twitter,
                facebook: platformToPostOn.Facebook,
                channel: "",
                pageUrl: facebookPageURL,
            }
        })
            .then(e => alert(`Posted successfully!`))
            .catch(err => alert(`Posting failed!\n\n${err}`))
    };
    const handleEmojiSelect = (emoji) => setPostText(`${postText}${emoji.native}`);
    const handlePostSourceChange = (ev, name) => {
        const isChecked = platformToPostOn[name];
        const platformLowerCase = name.toLowerCase()
        if (isBrowser() && !isChecked && !user[`${platformLowerCase}_id`]) {
            // Before this gets checked, prompt user to connect social media
            const wantsToConnectNow = window.confirm(`You can't post on platforms you didn't connect to!\n\nWould you like to connect your "${name}" account now?`)

            if (wantsToConnectNow) {
                const authUrl = `${authEndpoint}/${platformLowerCase}`
                window.open(authUrl, `_blank`)
            }

            return
        }
        const newSources = { ...platformToPostOn, [name]: !isChecked };
        setPlatformToPostOn(newSources);
    };
    if (isBrowser() && !isLoggedIn())
        navigate(`/app/login`);

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