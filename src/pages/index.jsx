/**
 * This page redirects signed in users to their home page, but for guests, it redirects
 * them to the /today page
 */
import React from "react";
import { navigate } from "gatsby";
import { isBrowser } from "../utils";
import { isLoggedIn } from "../services/auth";


const IndexPage = () => {

    if (isBrowser()) {
        if (isLoggedIn())
            navigate('/home')
        else
            navigate('/today')
    }

    return(<></>)
}

export default IndexPage
