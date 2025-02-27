/**
 * This script downloads schema definitions and makes it available for the apolloClient.
 * The schema definition is needed when using non-static data types such as fragments or unions.
 * 
 * More info: https://medium.com/commutatus/whats-going-on-with-the-heuristic-fragment-matcher-in-graphql-apollo-client-e721075e92be
 *
 * Note: This script is not used in the React code, but it should be executed on the development machine
 */

const fetch = require(`node-fetch`);
const fs = require(`fs`);

const gqlEndpoint = process.env.SCHEME_DOWNLOADER_GQL_ENDPOINT

if (!gqlEndpoint) {
  console.log(`[WARNING]:`, `No SCHEME_DOWNLOADER_GQL_ENDPOINT environment variable provided, will not update apollo schema definitions!`)
  return
}

fetch(`http://localhost:3400/graphql`, {
  method: `POST`,
  headers: { 'Content-Type': `application/json` },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFileSync(`./src/apollo/schemaQuery/fragmentTypes.json`, JSON.stringify(result.data), err => {
      if (err) {
        console.error(`Error writing fragmentTypes file`, err);
      } else {
        console.log(`Fragment types successfully extracted!`);
      }
    });
  });