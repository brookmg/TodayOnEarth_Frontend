/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import "./layout.css"
import ThemePalletteContext from "./Contexts/ThemePalletteContext"
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMediaQuery } from 'react-responsive'
import { isLoggedIn, signOut } from "../services/auth"
import AuthContext from "./Contexts/AuthContext"
import AnimatedLink from "./UIElements/AnimatedLink"
import { navigate } from "gatsby"
import ButtonCustom from "./UIElements/ButtonCustom"
import Margin from "./CompoundComponents/Margin"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';


const POSTS_SUBSCRIPTION = gql`

subscription{
  postAdded{
    title
  }
}
`;

const NavigationBar = (props) => {
  const theme = React.useContext(ThemePalletteContext)
  const user = React.useContext(AuthContext)

  const links = [
    { text: "Settings", url: "/mobile/settings", icon: <SettingsIcon /> }
  ]
  return (
    <div className={"navbar"}
      style={{
        backgroundColor: theme.color_background,
        fontFamily: theme.font_family,
      }}>
      <div style={{ width: '100%', padding: "0.5em" }}>
        <ButtonCustom
          borderColor={theme.color_background}
          backgroundColor={theme.color_background}
          color={theme.color_text}
          style={{
            width: '100%',
            overflow: 'hidden',
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >


          <div className="navbarTop">
            <p className="navbarAccountIcon">
              <AccountCircleIcon style={{
                width: "16px",
                height: "16px",
                margin: 0,
              }} />
            </p>
            {
              isLoggedIn() ?
                <div className="navbarShownOnHover">
                  <p>Hello, {user.first_name}</p>
                </div>
                : <>
                  <p className="navbarShownOnHover">
                    You should <AnimatedLink to="/app/login">log in</AnimatedLink> to see restricted
                          content
                  </p>

                </>
            }
          </div>

          <div className="navbarShownOnHover">
            {isLoggedIn() ? (
              <>
                <AnimatedLink to="/app/profile">Profile</AnimatedLink> | <a
                  href="/"
                  onClick={event => {
                    event.preventDefault()
                    signOut().then(() => {
                      user.refreshActiveUser(() => {
                        navigate(`/app/login`)
                      })
                    })
                  }}
                >
                  Logout
          </a>
              </>
            ) :
              null
            }
          </div>
        </ButtonCustom>

      </div>

      <div style={{ flex: 1, width: '100%', padding: "0.5em" }}>
        {
          links.map(
            e =>
              <div>
                <Margin vertical="0.5em">
                  <ButtonCustom
                    borderColor={theme.color_background}
                    backgroundColor={theme.color_background}
                    color={theme.color_text}
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      paddingRight: 0,
                      paddingLeft: 0,
                    }}
                  >
                    <AnimatedLink to={e.url}>
                      <span style={{
                        width: "16px",
                        height: "16px",
                        margin: 0,
                      }}>
                        {e.icon}
                      </span>
                      <span className="navbarBtnText">
                        {e.text}
                      </span>
                    </AnimatedLink>
                  </ButtonCustom>
                </Margin>
              </div>)
        }
      </div>

    </div>
  )
}
const Layout = ({ children, rightSideDesktopComponent, leftSideDesktopComponent }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const theme = React.useContext(ThemePalletteContext)

  const { data: postData, loading } = useSubscription(
    POSTS_SUBSCRIPTION,
  );

  if (postData) {
    const postAdded = postData.postAdded[0]

    if (postAdded.title && !loading) toast(postAdded.title)
  }

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <div style={{
        color: theme.color_text,
        backgroundColor: theme.color_background,
        display: isDesktopOrLaptop ? "flex" : "block",
        flexDirection: 'row'
      }}>
        {isDesktopOrLaptop && (leftSideDesktopComponent || <NavigationBar />)}
        <div style={{
          flex: 1,
          marginLeft: isDesktopOrLaptop ? '100px' : 0,
          overflowY: 'auto',
          height: '100vh'
        }}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
              fontFamily: theme.font_family
            }}
          >
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
          {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </div>
        {isDesktopOrLaptop && rightSideDesktopComponent}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
