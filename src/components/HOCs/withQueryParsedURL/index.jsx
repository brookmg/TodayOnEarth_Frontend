/**
 * This component helps to parse the url to enable input to pages via url query strings
 */
import React from "react";
import queryString from "query-string";
import { Location } from "@reach/router";


/**
 * 
 * @param {React.ElementType} ComponentToWrap Component to pass parsed url to
 */
const withQueryParsedURL = ComponentToWrap => props => (
  <Location>
    {({ location, navigate }) => (
      <ComponentToWrap
        {...props}
        location={location}
        navigate={navigate}
        queryParsedURL={queryString.parse(location.search)}
      />
    )}
  </Location>
)

export default withQueryParsedURL