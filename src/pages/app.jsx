/**
 * This page allows access to the profile page for logged in users, for guest users it will
 * prompt the user to login
 * 
 * Note: User needs to be logged in for this page to work as intended
 */
import React from "react";
import Layout from "../components/layout";
import Profile from "../components/profile";
import SignIn from "../components/SignIn";
import PrivateRoute from "../components/privateRoute";
import withRunTimeLoaded from "../components/HOCs/withRunTimeLoaded";
import { Router } from "@reach/router";


const App = withRunTimeLoaded(
    () =>
        (
            <Layout>
                <Router>
                    <PrivateRoute path={`/app/profile`} component={Profile} />
                    <SignIn path={`/app/login`} />
                </Router>
            </Layout>
        )
)

export default App