import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";


const AnimatedLink = (props) => (
    <AniLink {...props} paintDrip duration={0.5} color="rebeccapurple">
        {props.children}
    </AniLink>);

export default AnimatedLink;