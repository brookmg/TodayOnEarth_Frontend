import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FormInput, Fade } from "shards-react";


import ThemePalletteContext from "./Contexts/ThemePalletteContext"
import AnchorButton from "./UIElements/AnchorButton"


const Header = ({ siteTitle }) => {
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
      window.location.href=`/mobile/s?search_term=${encodeURIComponent(searchBarText)}`
    }
  }


  const theme = React.useContext(ThemePalletteContext)
  const [isSearchBarShowing, setIsSearchBarShowing] = React.useState(false);
  const [searchBarText, setSearchBarText] = React.useState("");
  let searchBarRef = React.createRef();


  return (
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <div style={{
          display: 'flex'
        }}>

          <h1 style={{ flex: 1, margin: 0 }}>
            <Link
              to="/"
              style={{
                color: theme.color_text,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Fade
              onMouseEnter={handleSearchButtonMouseEnter}
              in={isSearchBarShowing}>

              <FormInput
                innerRef={searchBarRef}

                onChange={handleSearchBarChange}
                onKeyPress={handleSearchBarKeyPress}

                size="sm" placeholder="Search for keywords" />

            </Fade>
            <AnchorButton
              onMouseEnter={handleSearchButtonMouseEnter}
              onClick={handleSearchButtonClick}>
              🔍
              </AnchorButton>
            <AnchorButton>≡</AnchorButton>
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
