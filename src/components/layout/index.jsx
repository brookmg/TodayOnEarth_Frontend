import React from "react";
import Header from "../header";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./layout.css";
import "react-toastify/dist/ReactToastify.css";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import NavigationBar from "../NavigationBar";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { useStaticQuery, graphql } from "gatsby";
import { toast } from "react-toastify";
import { useSubscription } from "@apollo/react-hooks";
import { intializeClickEffect } from "../ClickEffect";
import { isBrowser } from "../../utils";
import { StyledToastContainer, StyledCanvas, StyledFlexDirectionRowDiv, StyledFlex3OverflowYDiv, StyledHeaderDiv } from "./styles";
import { POSTS_SUBSCRIPTION } from "./queries";


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

                const handleNotificationClick = () => {
                    if (isBrowser()) window.location.href = `/p?id=${postAdded.postid}`
                }


                const notificationTitle = `New Post Found`
                const notificationBody = { body: postAdded.title }
                if (postAdded.title) {
                    if (!(`Notification` in window)) {
                        toast(postAdded.title, { onClick: handleNotificationClick })
                    }
                    else if (Notification.permission === `granted`) {
                        // if it's okay then create a notification
                        const notif = new Notification(notificationTitle, notificationBody)
                        notif.onclick = handleNotificationClick
                    }
                    else if (Notification.permission !== `denied`) {
                        Notification.requestPermission().then(function (permission) {
                            // if the user accepts, then create a notification
                            if (permission === `granted`) {
                                const notif = new Notification(notificationTitle, notificationBody)
                                notif.onclick = handleNotificationClick;
                            } else {
                                toast(postAdded.title, { onClick: handleNotificationClick })
                            }
                        });
                    }
                    else {
                        toast(postAdded.title, { onClick: handleNotificationClick })
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
