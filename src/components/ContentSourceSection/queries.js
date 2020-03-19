import gql from "graphql-tag";


export const GET_USER_PROVIDERS = gql`

{
  getProvidersForUser{
    provider
    source
  }
}
`;
export const ADD_PROVIDER = gql`

mutation addProvider($source: String!,$provider: String!){
  addProvider(provider: { provider: $provider, source: $source, frequency: "" }) {
    provider
  }
}
`;
export const REMOVE_PROVIDER = gql`

mutation removeProvider($provider: String!, $source: String!){
  removeProvider(provider:{
    provider:$provider,
    source:$source,
    frequency:""
  })
}
`;
export const GET_ALL_PROVIDERS = gql`

query getAllProviders($str: String){
  getProviders(
    page:0,
    range: 10,
    order: "ASC",
    orderBy: "source",
    filters:[
      {provider:$str, connector: "OR"},
      {source:$str, connector: "OR"},
    ]){
    source
    provider
  }
}
`;
