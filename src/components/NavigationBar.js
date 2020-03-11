import React from "react";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import { isLoggedIn, signOut } from "../services/auth";
import AuthContext from "./Contexts/AuthContext";
import AnimatedLink from "./UIElements/AnimatedLink";
import { navigate } from "gatsby";
import ButtonCustom from "./UIElements/ButtonCustom";
import Margin from "./CompoundComponents/Margin";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useMediaQuery } from 'react-responsive'
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { isColorDark } from "../utils";
import DefaultThemeDefinition from "../components/Contexts/ThemePalletteContext/DefaultThemeDefinition"


const NavigationBar = React.forwardRef((props, ref) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const theme = React.useContext(ThemePalletteContext);
    const user = React.useContext(AuthContext);
    const links = [
        { text: "Latest Posts", url: "/latest", icon: <AnnouncementIcon /> },
        { text: "Trending Posts", url: "/trendsByCommunityInteraction", icon: <TrendingUpIcon /> },
        { text: "Topic Posts", url: "/trendsByTopic", icon: <VisibilityIcon /> },
        { text: "Advanced Search", url: "/s?expanded=1", icon: <FindInPageIcon /> },
        { text: "Settings", url: "/settings", icon: <SettingsIcon /> },
    ];

    const handleNightModeClick = () => theme.setTheme({
        ...DefaultThemeDefinition,
        color_background: DefaultThemeDefinition.color_text,
        color_text: DefaultThemeDefinition.color_background,
        color_text_faded: `${DefaultThemeDefinition.color_background}66`,
    })
    const handleLightModeClick = () => theme.setTheme({ ...DefaultThemeDefinition })

    return (<div className={"navbar"} {...props} ref={ref} style={{
        ...props.style,
        backgroundColor: theme.color_background,
        fontFamily: theme.font_family,
    }}>
        <div style={{ width: '100%', padding: "0.5em" }}>
            <div style={{ display: 'flex', justifyContent: isDesktopOrLaptop ? 'flex-start' : 'flex-end' }}>
                <ButtonCustom className="navbarLinkButton" borderColor={theme.color_background} backgroundColor={theme.color_background} color={theme.color_text} style={{
                    overflow: 'hidden',
                    padding: 0,
                    margin: "0.5em",
                }}>
                    {isColorDark(theme.color_background) ?
                        <WbSunnyIcon onClick={handleLightModeClick} style={{
                            width: "28px",
                            height: "28px",
                        }} /> :
                        <NightsStayIcon onClick={handleNightModeClick} style={{
                            width: "28px",
                            height: "28px",
                        }} />
                    }
                </ButtonCustom>

            </div>
            <ButtonCustom borderColor={theme.color_background} backgroundColor={theme.color_background} color={theme.color_text} style={{
                width: '100%',
                overflow: 'hidden',
                paddingRight: 0,
                paddingLeft: 0,
            }}>


                <div className="navbarTop">
                    <p className="navbarAccountIcon">
                        <AccountCircleIcon style={{
                            width: "16px",
                            height: "16px",
                            margin: 0,
                        }} />
                    </p>
                    {isLoggedIn() ?
                        <div className="navbarShownOnHover">
                            <p>Hello, {user.first_name}</p>
                        </div>
                        : <>
                            <p className="navbarShownOnHover">
                                You should <AnimatedLink to="/app/login">log in</AnimatedLink> to see restricted
                                      content
                  </p>

                        </>}
                </div>

                <div className="navbarShownOnHover">
                    {isLoggedIn() ? (<>
                        <AnimatedLink to="/app/profile">Profile</AnimatedLink> | <a href="/" onClick={event => {
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
            </ButtonCustom>

        </div>

        <div style={{ flex: 1, width: '100%', padding: "0.5em" }}>
            {links.map(e => <div>
                <Margin vertical="0.5em">
                    <ButtonCustom className="navbarLinkButton" borderColor={theme.color_background} backgroundColor={theme.color_background} color={theme.color_text} style={{
                        width: '100%',
                        overflow: 'hidden',
                        paddingRight: 0,
                        paddingLeft: 0,
                    }}>
                        <AnimatedLink to={e.url}>
                            <span style={{
                                width: "16px",
                                height: "16px",
                                margin: '0.5em',
                            }}>
                                {e.icon}
                            </span>
                            <span className="navbarBtnText">
                                {e.text}
                            </span>
                        </AnimatedLink>
                    </ButtonCustom>
                </Margin>
            </div>)}
        </div>

    </div>);
});

export default NavigationBar;