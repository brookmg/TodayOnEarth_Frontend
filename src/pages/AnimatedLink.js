import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";


const AnimatedLink = (props) => (
    <AniLink paintDrip duration={0.5} color="rebeccapurple" to={props.to}>
        {props.children}
    </AniLink>);

export default AnimatedLink;