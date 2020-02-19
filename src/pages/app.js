import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import SignIn from "../components/SignIn"
import PrivateRoute from "../components/privateRoute"

const App = () => (
    <Layout>
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            <SignIn path="/app/login" />
        </Router>
    </Layout>
)
export default App