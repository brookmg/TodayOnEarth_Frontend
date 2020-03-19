import React from "react";
import Margin from "../CompoundComponents/Margin";
import ParseLinks from "../ParseLinks";
import { FormCheckbox } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { StyledBoldCenterDiv, StyledLeftDiv, StyledDiv, StyledLeftP } from "./styles";
import { GET_TODAYS_TRENDING_KEYWORDS } from "./queries";


const TrendingKeywords = (props) => {
    const [semanticEnabled, setSemanticEnabled] = React.useState(false);
    const { loading, error, data } = useQuery(GET_TODAYS_TRENDING_KEYWORDS, {
        variables: {
            semantics: semanticEnabled
        }
    });
    const handleSemanticsChange = () => setSemanticEnabled(!semanticEnabled);
    const keywords = data && data.getTodaysTrendingKeywords;
    return (
        <StyledDiv>
            <Margin horizontal={`2em`}>
                <StyledBoldCenterDiv>
                    <h3>Today's trending keywords</h3>
                    <StyledLeftDiv>
                        <FormCheckbox toggle small checked={semanticEnabled} onChange={handleSemanticsChange}>
                            Enable Semantic Analysis
                    </FormCheckbox>
                    </StyledLeftDiv>
                    <div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                    </div>
                    <div>
                        {!loading && keywords && keywords.filter(e => e.interest).slice(0, 20).map((e, i) => <div>
                            <StyledLeftP>
                                No {i + 1}: <ParseLinks>{e.interest}</ParseLinks>
                            </StyledLeftP>
                        </div>)}
                    </div>
                </StyledBoldCenterDiv>
            </Margin>
        </StyledDiv>);
};

export default TrendingKeywords