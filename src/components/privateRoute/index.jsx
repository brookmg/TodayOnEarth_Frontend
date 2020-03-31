/**
 * This component redirects users to the login page when they try to access routes that require authentication
 */
import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../services/auth";


/**
 * 
 * @param {React.ElementType} component Component to render is user is logged in
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isLoggedIn()) {
    navigate(`/app/login`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute