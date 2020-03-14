import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormCheckbox } from "shards-react";
import Margin from "./CompoundComponents/Margin";
import ParseLinks from "./UIElements/ParseLinks";
const GET_TODAYS_TRENDING_KEYWORDS = gql`

query getTodaysTrendingKeywords($semantics: Boolean){
  getTodaysTrendingKeywords(semantics:$semantics, page:0, range: 20){
    interest
    score
  }
}

`;
const TrendingKeywords = (props) => {
    const [semanticEnabled, setSemanticEnabled] = React.useState(false);
    const { loading, error, data } = useQuery(GET_TODAYS_TRENDING_KEYWORDS, {
        variables: {
            semantics: semanticEnabled
        }
    });
    const handleSemanticsChange = () => setSemanticEnabled(!semanticEnabled);
    const keywords = data && data.getTodaysTrendingKeywords;
    return (<>
        <Margin horizontal="2em">
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                <h3>Today's trending keywords</h3>
                <div style={{ textAlign: 'left' }}>
                    <FormCheckbox toggle small checked={semanticEnabled} onChange={handleSemanticsChange}>
                        Enable Semantic Analysis
      </FormCheckbox>

                </div>
                <div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                </div>


                <div>
                    {!loading && keywords && keywords.filter(e => e.interest).slice(0, 20).map((e, i) => <div>
                        <p style={{
                            margin: 0,
                            textAlign: 'left',
                        }}>
                            No {i + 1}: <ParseLinks>{e.interest}</ParseLinks>
                        </p>
                    </div>)}
                </div>
            </div>
        </Margin>
    </>);
};

export default TrendingKeywords