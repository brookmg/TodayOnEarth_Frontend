import React from 'react'
import { Location } from '@reach/router'
import queryString from 'query-string'

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