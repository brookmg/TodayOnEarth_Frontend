/**
 * This component is the responsive top bar used in all pages
 */
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import AnchorButton from "../AnchorButton";
import AnimatedLink from "../AnimatedLink";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { navigate } from "gatsby";
import { FormInput } from "shards-react";
import { isBrowser } from "../../utils";
import { StyledHeader, StyledNavigationBar, StyledOverlayDiv, StyledTitleDiv, StyledDisplayFlexDiv, StyledFlex1Margin0H1, StyledAnimatedLink, StyledDisplayFlexCenterTextDiv, StyledFade } from "./styles";


/**
 * 
 * @param {string} siteTitle Title to display on header
 */
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