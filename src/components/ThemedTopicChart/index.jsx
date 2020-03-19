import React from "react";
import gql from "graphql-tag";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { useQuery } from "@apollo/react-hooks";
import { Radar } from "react-chartjs-2";
import { StyledDiv } from "./styles";


const GET_POST_TOPICS = gql`

query getPostTopics($postId:Int){
  getPostTopics(postId:$postId, semantics:true){
    interest
    score
  }
}

`;

const ThemedTopicChart = ({ postId }) => {
    const theme = React.useContext(ThemePalletteContext);
    const [topics, setTopics] = React.useState([]);
    const [score, setScore] = React.useState([]);
    const { loading, error } = useQuery(GET_POST_TOPICS, {
        variables: {
            postId
        },
        skip: !postId,
        onCompleted: data => {
            if (data && data.getPostTopics) {
                const newInterests = [];
                const newScores = [];
                for (const e of data.getPostTopics) {
                    newInterests.push(e.interest);
                    newScores.push(e.score);
                }
                setTopics(newInterests);
                setScore(newScores);
            }
        },
        notifyOnNetworkStatusChange: true,
    });
    if (!score.length || !topics.length)
        return null;
    return (<>
        <StyledDiv>
            Topics
                <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div>
            <Radar options={{
                legend: { display: false },
                responsive: true,
                scale: {
                    gridLines: {
                        color: theme.color_text_faded,
                    },
                    ticks: {
                        display: false
                    },
                    pointLabels: {
                        fontColor: theme.color_text
                    }
                },
                elements: {
                    line: {
                        backgroundColor: `#ec628333`,
                        borderColor: `#ec6283`,
                    },
                    point: {
                        borderColor: `#ec6283`,
                        hoverRadius: 5,
                        hoverBorderWidth: 10,
                        borderWidth: 3,
                    }
                },
                tooltips: {
                    enabled: false
                }
            }} data={{
                labels: topics,
                datasets: [{
                    data: score
                }]
            }} />
        </StyledDiv>
    </>);
};

export default ThemedTopicChart