/**
 * This component shows information about the logged in user
 * 
 * Note: User needs to be logged in for this page to work as intended
 */
import React from "react";
import AuthContext from "../../contexts/AuthContext";
import SEO from "../seo";


const Profile = () => {
    const user = React.useContext(AuthContext)

    return (
        <div>
            <SEO title={`User Profile`} />
            <h1>Your profile</h1>
            <ul>
                <li>Name: {user.first_name}</li>
                <li>E-mail: {user.email}</li>
            </ul>
        </div>
    )
}

export default Profile