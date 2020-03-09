import { navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FormInput, Fade } from "shards-react";
import { isLoggedIn, signOut } from "../services/auth"
import ThemePalletteContext from "./Contexts/ThemePalletteContext"
import AuthContext from "./Contexts/AuthContext"
import AnchorButton from "./UIElements/AnchorButton"
import AnimatedLink from "./UIElements/AnimatedLink"
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from 'react-responsive'


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
      navigate(`/mobile/s?search_term=${encodeURIComponent(searchBarText)}`)
    }
  }


  const theme = React.useContext(ThemePalletteContext)
  const user = React.useContext(AuthContext)
  const [isSearchBarShowing, setIsSearchBarShowing] = React.useState(false);
  const [searchBarText, setSearchBarText] = React.useState("");
  let searchBarRef = React.createRef();


  let content = "You are not logged in"
  if (isLoggedIn()) {
    content = `Hello, ${user.first_name}`
  }

  return (
    <header
      style={{
        marginBottom: `1.45rem`,
        fontFamily: theme.font_family
      }}
    >
      <span>{content}</span>
      <AnimatedLink to="/app/profile">Profile</AnimatedLink>

      {isLoggedIn() ? (
        <a
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
      ) : null}
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

              <AnimatedLink to="/mobile/settings">
                <SettingsIcon htmlColor={theme.color_text} />
              </AnimatedLink>

              {
                !isDesktopOrLaptop &&
                <AnchorButton>
                  <MenuIcon htmlColor={theme.color_text} />
                </AnchorButton>
              }
            </div>
          </div>

        </div>


      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
