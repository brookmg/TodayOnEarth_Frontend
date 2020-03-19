import React from "react";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";
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
