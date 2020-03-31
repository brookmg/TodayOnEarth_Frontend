/**
 * This component is used for holding links to other gatsby pages
 */
import React from "react";
import styled from "styled-components";
import SettingsIcon from "@material-ui/icons/Settings";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ExploreIcon from "@material-ui/icons/Explore";
import HomeIcon from "@material-ui/icons/Home";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import DefaultThemeDefinition from "../../contexts/ThemePalletteContext/DefaultThemeDefinition";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import AuthContext from "../../contexts/AuthContext";
import AnimatedLink from "../AnimatedLink";
import Margin from "../CompoundComponents/Margin";
import { navigate } from "gatsby";
import { isLoggedIn, signOut } from "../../services/auth";
import { isColorDark } from "../../utils";
import { StyledWidthPaddingDiv, StyledDisplayFlexDiv, StyledMarginButtonCustom, StyledWbSunnyIcon, StyledNightsStayIcon, StyledNoHorizontalPaddingButtonCustom, StyledAccountCircleIcon, StyledFlex1Div, StyledSpan } from "./styles";


/**
 * 
 * @param {boolean} isMobileNavbarShowing Used only on mobile layout, set to true if the navbar is shown
 * @param {React.StyleHTMLAttributes} style This component's style 
 */
const UnStyledNavigationBar = React.forwardRef(({ isMobileNavbarShowing, style, ...rest }, ref) => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext)

    const theme = React.useContext(ThemePalletteContext);
    const user = React.useContext(AuthContext);

    const linksThatNeedAuth = [
        { text: `Home`, url: `/home`, icon: <HomeIcon /> },
        { text: `Create a Post`, url: `/create`, icon: <PostAddIcon /> },
        { text: `Discover`, url: `/userInterest`, icon: <ExploreIcon /> },
    ]
    const links = [
        ...(isLoggedIn() ? linksThatNeedAuth : []),
        { text: `Archives`, url: `/archives`, icon: <BusinessCenterIcon /> },
        { text: `Today`, url: `/today`, icon: <CalendarTodayIcon /> },
        { text: `Latest Posts`, url: `/latest`, icon: <AnnouncementIcon /> },
        { text: `Trending Posts`, url: `/trendsByCommunityInteraction`, icon: <TrendingUpIcon /> },
        { text: `Topic Posts`, url: `/trendsByTopic`, icon: <VisibilityIcon /> },
        { text: `Advanced Search`, url: `/s?expanded=1`, icon: <FindInPageIcon /> },
        { text: `Settings`, url: `/settings`, icon: <SettingsIcon /> },
    ];

    const handleNightModeClick = () => theme.setTheme({
        ...DefaultThemeDefinition,
        color_background: DefaultThemeDefinition.color_text,
        color_text: DefaultThemeDefinition.color_background,
        color_text_faded: `${DefaultThemeDefinition.color_background}66`,
    })
    const handleLightModeClick = () => theme.setTheme({ ...DefaultThemeDefinition })

    const isMobileNavbarShowingStyle = isMobileNavbarShowing ? { display: `unset`, visibility: `unset` } : {}

    return (<div {...rest} ref={ref} style={{
        ...style,
        backgroundColor: theme.color_background,
        fontFamily: theme.font_family,
    }}>
        <StyledWidthPaddingDiv>
            <StyledDisplayFlexDiv style={{ justifyContent: isDesktopOrLaptop ? `flex-start` : `flex-end` }}>
                <StyledMarginButtonCustom className={`navbarLinkButton`} borderColor={theme.color_background} backgroundColor={theme.color_background} color={theme.color_text}>
                    {isColorDark(theme.color_background) ?
                        <StyledWbSunnyIcon onClick={handleLightModeClick} /> :
                        <StyledNightsStayIcon onClick={handleNightModeClick} />
                    }
                </StyledMarginButtonCustom>

            </StyledDisplayFlexDiv>
            <StyledNoHorizontalPaddingButtonCustom borderColor={theme.color_background} backgroundColor={theme.color_background} color={theme.color_text}>
                <div className={`navbarTop`}>
                    <p className={`navbarAccountIcon`}>
                        <StyledAccountCircleIcon />
                    </p>
                    {isLoggedIn() ?
                        <div className={`navbarShownOnHover`} style={isMobileNavbarShowingStyle}>
                            <p>Hello, {user.first_name}</p>
                        </div>
                        : <>
                            <p className={`navbarShownOnHover`} style={isMobileNavbarShowingStyle}>
                                You should <AnimatedLink to={`/app/login`}>log in</AnimatedLink> to see restricted
                                      content
                  </p>

                        </>}
                </div>

                <div className={`navbarShownOnHover`} style={isMobileNavbarShowingStyle}>
                    {isLoggedIn() ? (<>
                        <AnimatedLink to={`/app/profile`}>Profile</AnimatedLink> | <a href={`/`} onClick={event => {
                            event.preventDefault();
                            signOut().then(() => {
                                user.refreshActiveUser(() => {
                                    navigate(`/app/login`);
                                });
                            });
                        }}>
                            Logout
          </a>
                    </>) :
                        null}
                </div>
            </StyledNoHorizontalPaddingButtonCustom>

        </StyledWidthPaddingDiv>

        <StyledFlex1Div>
            {links.map(e => <div>
                <Margin vertical={`0.5em`}>
                    <div>
                        <AnimatedLink to={e.url}>
                            <StyledNoHorizontalPaddingButtonCustom className={`navbarLinkButton`} borderColor={theme.color_background} backgroundColor={theme.color_background} color={theme.color_text}>
                                <StyledSpan>{e.icon}</StyledSpan>
                                <span className={`navbarBtnText`} style={isMobileNavbarShowingStyle}>
                                    {e.text}
                                </span>
                            </StyledNoHorizontalPaddingButtonCustom>
                        </AnimatedLink>
                    </div>
                </Margin>
            </div>)}
        </StyledFlex1Div>

    </div>);
});

const NavigationBar = styled(UnStyledNavigationBar)`
    width: 64px;
    height: 100%;
    z-index: 10000;
    left:0;
    right:0;
    padding: 0;
    box-shadow: -10px 0 20px;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    text-align: left;
    align-items: flex-start;
    transition: width 0.2s;
    transition-timing-function: ease-in;

    .navbarAccountIcon {
        margin-bottom: 1em;
    }
    .navbarLinkButton {
        text-align: left;
    }
    .navbarHiddenOnHover {
        display: unset;
    }
    .navbarShownOnHover {
        visibility: hidden;
    }
    .navbarBtnText {
        display: none;
    }

    &:hover {
        width: 256px;

        .navbarBtnText {
            display: unset;
        }
        .navbarTop {
            white-space: normal;
        }
        .navbarShownOnHover {
            visibility: unset;
        }
        .navbarHiddenOnHover {
            display: none;
        }
        .navbarAccountIcon {
            margin-bottom: 1em;
        }
        .navbarLinkButton {
            text-align: left;
        }
    }
`

export default NavigationBar;