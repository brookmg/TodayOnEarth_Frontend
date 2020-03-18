import React from "react";
import Layout from "../components/layout";
import Profile from "../components/profile";
import SignIn from "../components/SignIn";
import PrivateRoute from "../components/privateRoute";
import { Router } from "@reach/router";


const App = () => (
    <Layout>
        <Router>
            <PrivateRoute path={`/app/profile`} component={Profile} />
            <SignIn path={`/app/login`} />
        </Router>
    </Layout>
)
export default App