import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FormTextarea, FormCheckbox, FormInput } from "shards-react";
import ButtonSuccess from "../components/UIElements/ButtonSuccess";
import Margin from "../components/CompoundComponents/Margin"
import { isLoggedIn } from "../services/auth"
import AuthContext from "../components/Contexts/AuthContext"
import { navigate } from "gatsby"
import { isBrowser } from "../utils"
import gql from "graphql-tag"
import { useMutation } from '@apollo/react-hooks';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useMediaQuery } from 'react-responsive'


//TODO: remove un-needed console.log()

const CREATE_POST_MUTATION = gql`

mutation createPost(
  $text: String!
  $upload: Upload
  $telegram: Boolean
  $linkedin: Boolean
  $twitter: Boolean
  $channel: String
) {
  postOnToSocials(
    text: $text
    upload: $upload
    telegram: $telegram
    linkedin: $linkedin
    twitter: $twitter
    channel: $channel
  ){
    text
  }
}
`
const DEFAULT_PLATFORMS_TO_POST_ON = {
  "Telegram": true,
  "Facebook": false,
  "Instagram": false,
  "LinkedIn": true,
  "Twitter": true,
}

const PostsLatest = (props) => {
  const user = React.useContext(AuthContext)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const [platformToPostOn, setPlatformToPostOn] = React.useState(DEFAULT_PLATFORMS_TO_POST_ON)
  const [postText, setPostText] = React.useState("")
  const [telegramChannel, setTelegramChannel] = React.useState("")
  const [facebookPageURL, setFacebookPageURL] = React.useState("")
  const [fileToUpload, setFileToUpload] = React.useState(null)
  const [createPost, { data }] = useMutation(CREATE_POST_MUTATION)

  const handlePostTextChange = (e) => setPostText(e.target.value)
  const handleTelegramChannelChange = (e) => setTelegramChannel(e.target.value)
  const handleFacebookPageURLChange = (e) => setFacebookPageURL(e.target.value)
  const handlePostClick = () => {

    createPost({
      variables: {
        text: postText,
        upload: fileToUpload,
        telegram: platformToPostOn.Telegram,
        linkedin: platformToPostOn.LinkedIn,
        twitter: platformToPostOn.Twitter,
        //TODO: Instagram and Facebook remain
        channel: telegramChannel,
        pageUrl: facebookPageURL,
      }
    });
  }
  const handleEmojiSelect = (emoji) => setPostText(`${postText}${emoji.native}`)

  const handlePostSourceChange = (ev, name) => {
    const isChecked = platformToPostOn[name]
    const newSources = { ...platformToPostOn, [name]: !isChecked }

    const currentKeys = Object.keys(newSources)
    if (currentKeys.length === 0)
      return;

    let isSomethingChecked = false
    for (const e of currentKeys) {
      if (newSources[e]) {
        isSomethingChecked = true
        break;
      }
    }

    if (!isSomethingChecked) {
      for (const e of currentKeys)
        if (e !== name)
          newSources[e] = true
    }

    setPlatformToPostOn(newSources);
  }

  if (isBrowser() && !isLoggedIn()) navigate(`/app/login`)

  console.log("GQL response", data)
  return (
    <div>
      <h2>Create Post</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Margin vertical="1em">
            <div>
              Platforms to post on:
          </div>
          </Margin>
          <span>
            {
              Object.keys(platformToPostOn).map(
                e => <FormCheckbox
                  inline
                  key={e}
                  checked={!!platformToPostOn[e]}
                  onChange={ev => handlePostSourceChange(ev, e)}
                >
                  {e}
                </FormCheckbox>
              )
            }
            <Margin vertical="0.25em">
              {
                platformToPostOn.Telegram &&
                <FormInput
                  placeholder={"Telegram channel"}
                  onChange={handleTelegramChannelChange} />
              }
              {
                platformToPostOn.Facebook &&
                <FormInput
                  placeholder={"Facebook page URL"}
                  onChange={handleFacebookPageURLChange} />
              }
            </Margin>
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: "column", flex: 3 }}>
          <Margin horizontal="0.5em" vertical="0.5em">
            <div style={{ display: 'flex' }}>
              <FormTextarea
                style={{
                  fontFamily: 'emoji'
                }}
                value={postText}
                placeholder={`What's on your mind, ${isLoggedIn() && user.first_name}?`}
                rows={8}
                onChange={handlePostTextChange} />
              {isDesktopOrLaptop &&
                <Picker
                  title=""
                  showPreview={true}
                  set='emojione'
                  onSelect={handleEmojiSelect} />
              }
            </div>
            <span>Image or file to upload: <FormInput type="file" onChange={({ target: { files } }) => {
              const file = files[0]
              console.log(file)
              file && setFileToUpload(file)
            }} /></span>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <ButtonSuccess onClick={handlePostClick}>Create Post</ButtonSuccess>
            </div>
          </Margin>
        </div>
      </div>

    </div>
  )
};

const CreatePage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <PostsLatest />
    </Layout>
  )
}

export default CreatePage
