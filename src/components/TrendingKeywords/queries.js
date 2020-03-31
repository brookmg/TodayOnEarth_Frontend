/**
 * This file contains queries for TrendingKeywords component
 */
import gql from "graphql-tag";


export const GET_TODAYS_TRENDING_KEYWORDS = gql`

query getTodaysTrendingKeywords($semantics: Boolean){
  getTodaysTrendingKeywords(semantics:$semantics, page:0, range: 20){
    interest
    score
  }
}

`;
