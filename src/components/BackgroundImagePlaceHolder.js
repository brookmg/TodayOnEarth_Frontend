import React from "react";
import ContentLoader from 'react-content-loader';


const BackgroundImagePlaceHolder = () => <div>
    <ContentLoader height={200} style={{
        minWidth: '100%',
    }}>
        <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
</div>;

export default BackgroundImagePlaceHolder