import React from "react";
import userSchemaDefinition from "./userSchemaDefinition"
import {getUser} from "../../../services/auth"

const AuthContext = React.createContext({
    ...userSchemaDefinition,
    setAuthenticatedUser: () => { }
})

export const AuthProvider = (props) => {
    const [authenticatedUser, setAuthenticatedUser] = React.useState({ ...userSchemaDefinition });
    
    React.useEffect(() => {
        getUser().then(e => {
            setAuthenticatedUser({ ...e.data.getUser })
        })

    }, [])

    return (
        <AuthContext.Provider value={{ ...authenticatedUser, setAuthenticatedUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
