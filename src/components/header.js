import { navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FormInput, Fade } from "shards-react";
import ThemePalletteContext from "./Contexts/ThemePalletteContext"
import AnchorButton from "./UIElements/AnchorButton"
import AnimatedLink from "./UIElements/AnimatedLink"
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from 'react-responsive'
import NavigationBar from "./NavigationBar";


const Header = ({ siteTitle }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const handleSearchButtonClick = (e) => {
    if (searchBarText === "") {
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
    if (event.key === 'Enter') {
      handleSearchSubmit()
    }
  }
  const handleSearchSubmit = (e) => {
    if (searchBarText !== "") {
      console.log("searching for:", searchBarText)
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
  const [searchBarText, setSearchBarText] = React.useState("");
  const [isNavbarShowing, setIsNavBarShowing] = React.useState(false);
  let searchBarRef = React.createRef();
  let navbarRef = React.createRef();

  return (
    <header
      style={{
        marginBottom: `1.45rem`,
        fontFamily: theme.font_family
      }}
    >
      <NavigationBar
        ref={navbarRef}
        isMobileNavbarShowing={isNavbarShowing && !isDesktopOrLaptop}
        style={{
          left: isNavbarShowing ? 'calc(100% - 256px)' : '100%',
          boxShadow: 'none',
          width: '256px',
          transition: 'left 0.2s linear',
        }}
      />
      <div
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 11,
          display: 'unset',

          ...(isNavbarShowing ?
            { backgroundColor: '#0000004a', position: 'absolute' } :
            { backgroundColor: '#00000000', display: 'unset' }
          )
        }}
        className={isNavbarShowing ? "navbarOverlayShowing" : "navbarOverlayHidden"}
        onClick={handleOverlayClick}
      >
      </div>

      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isDesktopOrLaptop ? "" : "column-reverse"
        }}>

          <h1 style={{ flex: 1, margin: 0, fontFamily: theme.font_family }}>
            <AnimatedLink
              to="/"
              style={{
                color: theme.color_text,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </AnimatedLink>
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Fade
              style={{ flex: 1 }}
              onMouseEnter={handleSearchButtonMouseEnter}
              in={isSearchBarShowing}>

              <FormInput
                innerRef={searchBarRef}

                onChange={handleSearchBarChange}
                onKeyPress={handleSearchBarKeyPress}

                size="sm" placeholder="Search for keywords" />

            </Fade>
            <div>
              <AnchorButton
                onMouseEnter={handleSearchButtonMouseEnter}
                onClick={handleSearchButtonClick}>
                <SearchIcon htmlColor={theme.color_text} />
              </AnchorButton>

              <AnimatedLink to="/settings">
                <SettingsIcon htmlColor={theme.color_text} />
              </AnimatedLink>

              {
                !isDesktopOrLaptop &&
                <AnchorButton>
                  <MenuIcon htmlColor={theme.color_text} onClick={handleNavBarBtnClick} />
                </AnchorButton>
              }
            </div>
          </div>

        </div>


      </div>
    </header >
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
