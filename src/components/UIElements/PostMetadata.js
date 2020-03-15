import React from 'react';
import { Badge } from "shards-react";
import Margin from '../CompoundComponents/Margin';


const PostMetadata = (props) => {
    const communityInteraction = props.communityInteraction
    if (!communityInteraction) return null

    const isInstagram = props.sourceLink && props.sourceLink.includes("https://www.instagram.com")
    const instagramBG = 'linear-gradient(to right bottom, #ff512f, #dd2476)'

    return (
        <div>
            <Margin left="0.5rem">
                {!communityInteraction.views ? null :
                    <Badge style={{ background: '#97ceef' }} pill>
                        👁️ {Number(communityInteraction.views) / 1000} K
                </Badge>
                }
                {!communityInteraction.likes ? null :
                    <Badge style={{ background: isInstagram ? instagramBG : '#38b5fe' }} pill>
                        👍 {Number(communityInteraction.likes) / 1000} K
                </Badge>}

                {!communityInteraction.replies ? null :
                    <Badge style={{ background: '#38b5fe' }} pill>
                        🗨 {Number(communityInteraction.replies) / 1000} K
                </Badge>}

                {!communityInteraction.retweets ? null :
                    <Badge style={{ background: '#38b5fe' }} pill>
                        🔁 {Number(communityInteraction.retweets) / 1000} K
                </Badge>}

                {!communityInteraction.comments ? null :
                    <Badge style={{ background: isInstagram ? instagramBG : '#476e98' }} pill>
                        💬 {Number(communityInteraction.comments) / 1000} K
                </Badge>}

                {!communityInteraction.video_views ? null :
                    <Badge style={{ background: '#476e98' }} pill>
                        📺 {Number(communityInteraction.video_views) / 1000} K
                </Badge>}
            </Margin>
        </div>
    )

}

export default PostMetadata;