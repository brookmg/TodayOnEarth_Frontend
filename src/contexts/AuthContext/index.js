import React from "react";
import userSchemaDefinition from "./userSchemaDefinition";
import { getUser } from "../../services/auth";


const AuthContext = React.createContext({
    ...userSchemaDefinition,
    refreshActiveUser: () => { }
})

export const AuthProvider = ({ children }) => {
    const getActiveUser = (callback) => {
        getUser().then(e => {
            setAuthenticatedUser({ ...e.data.getUser })
            callback && callback()
        })
    }
    const [authenticatedUser, setAuthenticatedUser] = React.useState({ ...userSchemaDefinition });

    React.useEffect(() => {
        getActiveUser()
    }, [])

    return (
        <AuthContext.Provider value={{ ...authenticatedUser, refreshActiveUser: getActiveUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
