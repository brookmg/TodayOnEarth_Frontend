import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { isLoggedIn } from "../services/auth"
import AuthContext from "../components/Contexts/AuthContext"

const IndexPage = () => {
  const user = React.useContext(AuthContext)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <h1>Hello {isLoggedIn() ? user.first_name : "world"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
            <>
              You should <Link to="/app/login">log in</Link> to see restricted
              content
        </>
          )}
      </p>

      <p><Link to="/signup">Sign Up</Link></p>

      <Link to="/page-2/">Go to page 2</Link>
      <br />
      <Link to="/mobile/">Go to mobile site</Link>
    </Layout>
  )
}

export default IndexPage
