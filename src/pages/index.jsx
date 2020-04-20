/**
 * This page redirects both signed in and guest users to the /today page
 */
import React from "react";
import { navigate } from "gatsby";
import { isBrowser } from "../utils";


const IndexPage = () => {
    if (isBrowser())
        navigate(`/today`)
    return (<></>)
}

export default IndexPage
