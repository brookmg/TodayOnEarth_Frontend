import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";


const StyledContentLoader = styled(ContentLoader)`
    min-width: 100%;
`

const BackgroundImagePlaceHolder = () => <div>
    <StyledContentLoader height={200}>
        <rect x={`0`} y={`0`} width={`100%`} height={`100%`} />
    </StyledContentLoader>
</div>;

export default BackgroundImagePlaceHolder