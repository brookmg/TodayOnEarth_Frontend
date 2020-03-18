import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./layout.css";
import "react-toastify/dist/ReactToastify.css";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import NavigationBar from "./NavigationBar";
import ScreenSizeContext from "./Contexts/ScreenSizeContext";
import { useStaticQuery, graphql } from "gatsby";
import { ToastContainer, toast } from "react-toastify";
import { useSubscription } from "@apollo/react-hooks";
import { intializeClickEffect } from "./UIElements/ClickEffect";
import { isBrowser } from "../utils";


const POSTS_SUBSCRIPTION = gql`

subscription{
  postAdded{
    title
  }
}
`;

const StyledToastContainer = styled(ToastContainer)`
  height: 100vh;
`

const StyledCanvas = styled.canvas`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`

const StyledFlexDirectionRowDiv = styled.div`
    flex-direction: row;
`

const StyledFlex3OverflowYDiv = styled.div`
    flex: 3;
    overflow-y: auto;
    height: 100vh;
`

const StyledHeaderDiv = styled.div`
    margin: 0 auto;
    max-width: 960;
    padding: 0 1.0875rem 1.45rem;
`

const Layout = ({ render, children, rightSideDesktopComponent, leftSideDesktopComponent }) => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext)

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

    useSubscription(
        POSTS_SUBSCRIPTION, {
        onSubscriptionData: (subData) => {
            const postData = subData.subscriptionData.data
            if (postData) {
                const postAdded = postData.postAdded[0]

                const notificationTitle = `New Post Found`
                const notificationBody = { body: postAdded.title }
                if (postAdded.title) {
                    if (!(`Notification` in window)) {
                        toast(postAdded.title)
                    }
                    else if (Notification.permission === `granted`) {
                        // if it's okay then create a notification
                        new Notification(notificationTitle, notificationBody);
                    }
                    else if (Notification.permission !== `denied`) {
                        Notification.requestPermission().then(function (permission) {
                            // if the user accepts, then create a notification
                            if (permission === `granted`) {
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
        }
    }
    );


    return (
        <>
            <StyledToastContainer hideProgressBar={true} />
            <StyledCanvas ref={canvasRef} />
            <StyledFlexDirectionRowDiv style={{
                color: theme.color_text,
                backgroundColor: theme.color_background,
                display: isDesktopOrLaptop ? `flex` : `block`,
            }}

                onClick={(ev) => setMouseClickPosition({
                    x: ev.nativeEvent.clientX,
                    y: ev.nativeEvent.clientY,
                })}>
                {(isDesktopOrLaptop || !isBrowser()) && (leftSideDesktopComponent || <NavigationBar />)}
                <StyledFlex3OverflowYDiv
                    onScroll={handleOnScroll}
                    ref={scrollDivRef}
                    style={{
                        marginLeft: (isDesktopOrLaptop || !isBrowser()) ? `64px` : 0,
                    }}>
                    <Header siteTitle={data.site.siteMetadata.title} />
                    <StyledHeaderDiv
                        style={{
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
                            <a href={`https://www.gatsbyjs.org`}>Gatsby</a>
                        </footer>
                    </StyledHeaderDiv>
                </StyledFlex3OverflowYDiv>
                {isDesktopOrLaptop && rightSideDesktopComponent}
            </StyledFlexDirectionRowDiv>
        </>
    )
}

export default Layout
