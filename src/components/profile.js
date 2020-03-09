import React from "react"
import AuthContext from "./Contexts/AuthContext"

const Profile = () => {
const user = React.useContext(AuthContext)

  return (
    <div>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.first_name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </div>
  )
}

export default Profile