/**
 * This component is the responsive main layout. It's used in every page and serves to 
 * structure the layout elements (header, navbar, footer). Additionally it's also used to 
 * hold the click effect canvas and toast layout.
 */
import React from "react";
import Header from "../header";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./layout.css";
import "react-toastify/dist/ReactToastify.css";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import NavigationBar from "../NavigationBar";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import AnchorButton from "../AnchorButton";
import AuthContext from "../../contexts/AuthContext";
import { useStaticQuery, graphql } from "gatsby";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { useSubscription } from "@apollo/react-hooks";
import { intializeClickEffect } from "../ClickEffect";
import { isLoggedIn } from "../../services/auth";
import { isBrowser } from "../../utils";
import { StyledToastContainer, StyledCanvas, StyledFlexDirectionRowDiv, StyledFlex3OverflowYDiv, StyledHeaderDiv, StyledRedTextDiv } from "./styles";
import { POSTS_SUBSCRIPTION, RESEND_VERIFICATION_EMAIL } from "./queries";


/* Previous frame's scroll position */
let prevScrollValue = -1;

/**
 * 
 * @param {function} render Render function to use. This is used to pass the scroll state to the children. If this is provided, children will not be rendered
 * @param {React.ElementType} children This component's children, will be ignored if render prop is available
 * @param {React.ElementType} rightSideDesktopComponent Component to show on the right side of the layout. This is available only on desktop
 * @param {React.ElementType} leftSideDesktopComponent Component to show on the left side of the layout. This is available only on desktop
 */
const Layout = ({ render, children, rightSideDesktopComponent, leftSideDesktopComponent }) => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext)
    const [resendVerificationEmail] = useMutation(RESEND_VERIFICATION_EMAIL)

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
    const user = React.useContext(AuthContext);
    const scrollDivRef = React.createRef()
    const canvasRef = React.createRef()
    const [isBottomReached, setIsBottomReached] = React.useState(false)
    const [mouseClickPosition, setMouseClickPosition] = React.useState({ x: 0, y: 0 })

    React.useEffect(() => {
        intializeClickEffect(canvasRef, mouseClickPosition)
    }, [mouseClickPosition])

    const handleOnScroll = () => {
        const scrollValue = scrollDivRef.current.scrollTop + scrollDivRef.current.offsetHeight
        const height = scrollDivRef.current.scrollHeight

        if (prevScrollValue !== scrollValue && scrollValue !== 0 && scrollValue >= height) {
            setIsBottomReached(true)
        } else {
            setIsBottomReached(false)
        }
        prevScrollValue = scrollValue
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

    const handleResendEmailClick = async () => {
        if (!isBrowser()) return
        await resendVerificationEmail()
            .then(e => toast(`Verification message resent`, {
                type: toast.TYPE.SUCCESS
            }))
            .catch(err =>
                window.alert(`Could not resend verification email:\n\n${err.message}`))
    }
    const isUserVerified = user.is_verified

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
                                (isLoggedIn() && !isUserVerified) &&
                                <StyledRedTextDiv>
                                    <p>You have not verified your email address!{" "}
                                        <AnchorButton onClick={handleResendEmailClick}>Click here to resend email</AnchorButton>
                                    </p>
                                </StyledRedTextDiv>
                            }
                            {
                                (
                                    render &&
                                    render(isBottomReached)
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
