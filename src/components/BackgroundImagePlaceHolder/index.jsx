import React from "react";
import { StyledContentLoader } from "./styles";


const BackgroundImagePlaceHolder = () => <div>
    <StyledContentLoader height={200}>
        <rect x={`0`} y={`0`} width={`100%`} height={`100%`} />
    </StyledContentLoader>
</div>;

export default BackgroundImagePlaceHolder