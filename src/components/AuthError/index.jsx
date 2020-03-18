import React from "react";
import { Link } from "gatsby";


const AuthError = ({ error }) => (
    <div>
        <h1>There was an error with authentication</h1>
        <pre>
            Error message:
        {error}
        </pre>

        <p><Link to={`/signup`}>Sign Up</Link> | <Link to={`/app/login`}>Log In</Link></p>
    </div>
);

export default AuthError