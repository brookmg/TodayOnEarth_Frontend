import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import AnchorButton from "./UIElements/AnchorButton";
import AnimatedLink from "./UIElements/AnimatedLink";
import NavigationBar from "./NavigationBar";
import ScreenSizeContext from "./Contexts/ScreenSizeContext";
import { navigate } from "gatsby";
import { FormInput, Fade } from "shards-react";
import { isBrowser } from "../utils";


const StyledHeader = styled.header`
    margin-bottom: 1.45rem;
`

const StyledNavigationBar = styled(NavigationBar)`
    box-shadow: none;
    width: 256px;
    transition: left 0.2s linear;
`

const StyledOverlayDiv = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    display: unset;
`

const StyledTitleDiv = styled.div`
    margin: 0 auto;
    max-width: 960;
    padding: 1.45rem 1.0875rem;
`

const StyledDisplayFlexDiv = styled.div`
    display: flex;
`

const StyledFlex1Margin0H1 = styled.h1`
    flex: 1;
    margin: 0;
`

const StyledDisplayFlexCenterTextDiv = styled(StyledDisplayFlexDiv)`
    align-items: center;
`

const StyledFade = styled(Fade)`
    flex: 1
`

const StyledAnimatedLink = styled(AnimatedLink)`
    text-decoration: none;
`

const Header = ({ siteTitle }) => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext)

    const handleSearchButtonClick = (e) => {
        if (searchBarText === ``) {
            searchBarRef.current.focus()
        } else {
            handleSearchSubmit()
        }
    }

    const handleSearchButtonMouseEnter = (e) => {
        setIsSearchBarShowing(true)
    }

    const handleSearchBarChange = (e) => {
        const value = e.target.value
        setSearchBarText(value)
    }
    const handleSearchBarKeyPress = (event) => {
        if (event.key === `Enter`) {
            handleSearchSubmit()
        }
    }
    const handleSearchSubmit = (e) => {
        if (searchBarText !== ``) {
            console.log(`searching for:`, searchBarText)
            navigate(`/s?search_term=${encodeURIComponent(searchBarText)}`)
        }
    }
    const handleNavBarBtnClick = () => {
        setIsNavBarShowing(!isNavbarShowing)
    }
    const handleOverlayClick = () => {
        setIsNavBarShowing(false)
    }


    const theme = React.useContext(ThemePalletteContext)
    const [isSearchBarShowing, setIsSearchBarShowing] = React.useState(false);
    const [searchBarText, setSearchBarText] = React.useState(``);
    const [isNavbarShowing, setIsNavBarShowing] = React.useState(false);
    let searchBarRef = React.createRef();
    let navbarRef = React.createRef();

    return (
        <StyledHeader
            style={{
                fontFamily: theme.font_family
            }}
        >
            <StyledNavigationBar
                ref={navbarRef}
                isMobileNavbarShowing={isNavbarShowing && !isDesktopOrLaptop}
                style={{
                    left: isNavbarShowing ? `calc(100% - 256px)` : `100%`,
                }}
            />
            <StyledOverlayDiv
                style={{
                    ...(isNavbarShowing ?
                        { backgroundColor: `#0000004a`, position: `absolute` } :
                        { backgroundColor: `#00000000`, display: `unset` }
                    )
                }}
                className={isNavbarShowing ? `navbarOverlayShowing` : `navbarOverlayHidden`}
                onClick={handleOverlayClick}
            >
            </StyledOverlayDiv>

            <StyledTitleDiv>
                <StyledDisplayFlexDiv style={{
                    flexDirection: (isDesktopOrLaptop || !isBrowser()) ? `` : `column-reverse`
                }}>

                    <StyledFlex1Margin0H1 style={{ fontFamily: theme.font_family }}>
                        <StyledAnimatedLink
                            to={`/`}
                            style={{
                                color: theme.color_text,
                            }}
                        >
                            {siteTitle}
                        </StyledAnimatedLink>
                    </StyledFlex1Margin0H1>

                    <StyledDisplayFlexCenterTextDiv>
                        <StyledFade
                            onMouseEnter={handleSearchButtonMouseEnter}
                            in={isSearchBarShowing}>

                            <FormInput
                                innerRef={searchBarRef}

                                onChange={handleSearchBarChange}
                                onKeyPress={handleSearchBarKeyPress}

                                size={`sm`} placeholder={`Search for keywords`} />

                        </StyledFade>
                        <div>
                            <AnchorButton
                                onMouseEnter={handleSearchButtonMouseEnter}
                                onClick={handleSearchButtonClick}>
                                <SearchIcon htmlColor={theme.color_text} />
                            </AnchorButton>

                            <AnimatedLink to={`/settings`}>
                                <SettingsIcon htmlColor={theme.color_text} />
                            </AnimatedLink>

                            {
                                !isDesktopOrLaptop &&
                                <AnchorButton>
                                    <MenuIcon htmlColor={theme.color_text} onClick={handleNavBarBtnClick} />
                                </AnchorButton>
                            }
                        </div>
                    </StyledDisplayFlexCenterTextDiv>
                </StyledDisplayFlexDiv>
            </StyledTitleDiv>
        </StyledHeader>
    )
}

export default Header