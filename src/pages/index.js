import React from "react";
import { isLoggedIn } from "../services/auth";
import { navigate } from "gatsby";
import { isBrowser } from "../utils";


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
