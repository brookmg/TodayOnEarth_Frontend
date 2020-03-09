import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { FormTextarea, FormCheckbox } from "shards-react";
import ButtonSuccess from "../../components/UIElements/ButtonSuccess";
import Margin from "../../components/CompoundComponents/Margin"
import { isLoggedIn } from "../../services/auth"
import AuthContext from "../../components/Contexts/AuthContext"
import { navigate } from "gatsby"
import { isBrowser } from "../../utils"


const DEFAULT_PLATFORMS_TO_POST_ON = {
  "t.me": true,
  "facebook.com": true,
  "instagram.com": true,
  "twitter.com": true
}

const PostsLatest = (props) => {
  const user = React.useContext(AuthContext)

  const [platformToPostOn, setPlatformToPostOn] = React.useState(DEFAULT_PLATFORMS_TO_POST_ON)
  const [postText, setPostText] = React.useState("")

  const handlePostTextChange = (e) => setPostText(e.target.value)
  const handlePostClick = () => alert("TODO: implement this")

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
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: "column", flex: 3 }}>
          <Margin horzontal="0.5em" vertical="0.5em">
            <FormTextarea placeholder={`What's on your mind, ${isLoggedIn() && user.first_name}?`} rows={8} onChange={handlePostTextChange} />
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
