import React from "react";
import queryString from "query-string";
import { Location } from "@reach/router";


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