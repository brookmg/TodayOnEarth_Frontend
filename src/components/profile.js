import React from "react"
import AuthContext from "./Contexts/AuthContext"

const Profile = () => {
const user = React.useContext(AuthContext)

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.first_name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  )
}

export default Profile