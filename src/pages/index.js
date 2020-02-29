import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { isLoggedIn } from "../services/auth"
import AuthContext from "../components/Contexts/AuthContext"
import AnimatedLink from "../components/UIElements/AnimatedLink"


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
            <AnimatedLink to="/app/profile">profile</AnimatedLink>
          </>
        ) : (
            <>
              You should <AnimatedLink to="/app/login">log in</AnimatedLink> to see restricted
              content
        </>
          )}
      </p>

      <p><AnimatedLink to="/signup">Sign Up</AnimatedLink></p>

      <AnimatedLink to="/page-2/">Go to page 2</AnimatedLink>
      <br />
      <AnimatedLink to="/mobile/">Go to mobile site</AnimatedLink>
    </Layout>
  )
}

export default IndexPage
