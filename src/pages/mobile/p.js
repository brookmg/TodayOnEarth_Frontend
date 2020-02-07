import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { Tooltip } from "shards-react";

import ContentLoader from 'react-content-loader'

import AnchorButton from "../../components/UIElements/AnchorButton"

import withQueryParsedURL from "../../components/HOCs/withQueryParsedURL"


const BackgroundImagePlaceHolder = () => <div>
    <ContentLoader height={200} style={{
        minWidth: '100%',
    }}>
        <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
</div>

const PublisherImagePlaceHolder = () => <div>
    <ContentLoader
        style={{
            display: 'block',
            margin: '0 auto'
        }}
        speed={1} width={200} height={200} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="100" />
    </ContentLoader>
</div>



const PostDetail = withQueryParsedURL((props) => {

    const handleShareClick = (e) => {
        navigator.clipboard.writeText(window.location.href)
    }
    const toggleShareTooltipOpen = () => {
        setShareTooltipOpen(!isShareTooltipOpen)
    }

    const [isShareTooltipOpen, setShareTooltipOpen] = React.useState(false);

    return (
        <div style={{
            position: 'relative',
            top: `-100px`
        }} >
            <div style={{ textAlign: 'center' }}>
                <PublisherImagePlaceHolder />
                <p>Publisher name here</p>
            </div>
            <div>
                <AnchorButton id="shareButton" onClick={handleShareClick}>Share 🔗</AnchorButton>
                <Tooltip
                    trigger="click"
                    open={isShareTooltipOpen}
                    target="#shareButton"
                    toggle={toggleShareTooltipOpen}
                >
                    URL copied to clipboard!
        </Tooltip>
            </div>

            <h1>Post id: {props.queryParsedURL.id}</h1>

            <h1>Post title</h1>
            <div>
                <p>Post Body Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
            </div>
        </div>

    );
})


const PostDetailPage = () => (
    <Layout>
        <SEO title="Home" />
        <div>
            <BackgroundImagePlaceHolder />

            <PostDetail />
        </div>

        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
)

export default PostDetailPage
