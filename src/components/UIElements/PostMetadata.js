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
                {communityInteraction.views &&
                    <Badge style={{ background: '#97ceef' }} pill>
                        👁️ {Number(communityInteraction.views) / 1000} K
                </Badge>
                }
                {communityInteraction.likes &&
                    <Badge style={{ background: isInstagram ? instagramBG : '#38b5fe' }} pill>
                        👍 {Number(communityInteraction.likes) / 1000} K
                </Badge>}

                {communityInteraction.replies &&
                    <Badge style={{ background: '#38b5fe' }} pill>
                        🗨 {Number(communityInteraction.replies) / 1000} K
                </Badge>}

                {communityInteraction.retweets &&
                    <Badge style={{ background: '#38b5fe' }} pill>
                        🔁 {Number(communityInteraction.retweets) / 1000} K
                </Badge>}

                {communityInteraction.comments &&
                    <Badge style={{ background: isInstagram ? instagramBG : '#476e98' }} pill>
                        💬 {Number(communityInteraction.comments) / 1000} K
                </Badge>}

                {communityInteraction.video_views &&
                    <Badge style={{ background: '#476e98' }} pill>
                        📺 {Number(communityInteraction.video_views) / 1000} K
                </Badge>}
            </Margin>
        </div>
    )

}

export default PostMetadata;