/**
 * This page redirects both signed in and guest users to the /today page
 */
import React from "react";
import { navigate } from "gatsby";


const IndexPage = () => {
    navigate(`/today`)
    return (<></>)
}

export default IndexPage
