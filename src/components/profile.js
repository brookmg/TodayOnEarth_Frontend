import React from "react";
import AuthContext from "./Contexts/AuthContext";
import SEO from "../components/seo";


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