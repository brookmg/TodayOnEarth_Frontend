/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
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
import NavigationBar from "./NavigationBar"
import { intializeClickEffect } from "./UIElements/ClickEffect"


const POSTS_SUBSCRIPTION = gql`

subscription{
  postAdded{
    title
  }
}
`;

const Layout = ({ render, children, rightSideDesktopComponent, leftSideDesktopComponent }) => {
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
  const scrollDivRef = React.createRef()
  const canvasRef = React.createRef()
  const [scrollDivState, setScrollDivState] = React.useState({ scrollValue: 0, height: 0 })
  const [mouseClickPosition, setMouseClickPosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    intializeClickEffect(canvasRef, mouseClickPosition)
  }, [mouseClickPosition])

  const handleOnScroll = () => {
    setScrollDivState({
      scrollValue: scrollDivRef.current.scrollTop + scrollDivRef.current.offsetHeight,
      height: scrollDivRef.current.scrollHeight
    })
  }

  const { data: postData, loading } = useSubscription(
    POSTS_SUBSCRIPTION,
  );

  if (postData) {
    const postAdded = postData.postAdded[0]

    const notificationTitle = 'New Post Found'
    const notificationBody = { body: postAdded.title }
    if (postAdded.title && !loading) {
      if (!("Notification" in window)) {
        toast(postAdded.title)
      }
      else if (Notification.permission === "granted") {
        // if it's okay then create a notification
        new Notification(notificationTitle, notificationBody);
      }
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // if the user accepts, then create a notification
          if (permission === "granted") {
            new Notification(notificationTitle, notificationBody);
          } else {
            toast(postAdded.title)
          }
        });
      }
      else {
        toast(postAdded.title)
      }
    }
  }
  return (
    <>
      <ToastContainer hideProgressBar={true} style={{ height: '100vh' }} />
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      />
      <div style={{
        color: theme.color_text,
        backgroundColor: theme.color_background,
        display: isDesktopOrLaptop ? "flex" : "block",
        flexDirection: 'row'
      }}

        onClick={(ev) => setMouseClickPosition({
          x: ev.nativeEvent.clientX,
          y: ev.nativeEvent.clientY,
        })}>
        {isDesktopOrLaptop && (leftSideDesktopComponent || <NavigationBar />)}
        <div
          onScroll={handleOnScroll}
          ref={scrollDivRef}
          style={{
            flex: 3,
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
              fontFamily: theme.font_family,
              fontSize: `${theme.font_size}px`
            }}
          >
            <main>
              {
                (
                  render &&
                  render(scrollDivState)
                ) ||
                children
              }
            </main>
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

export default Layout
