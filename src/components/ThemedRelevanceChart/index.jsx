/**
 * This component shows a posts relevance to a users interests
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { useQuery } from "@apollo/react-hooks";
import { Radar } from "react-chartjs-2";
import { StyledDiv } from "./styles";
import { GET_POST_RELEVANCE } from "./queries";


/**
 * 
 * @param {number} postId 
 */
const ThemedRelevanceChart = ({ postId }) => {
    const theme = React.useContext(ThemePalletteContext);
    const [relevance, setRelevance] = React.useState([]);
    const [score, setScore] = React.useState([]);
    const { loading, error } = useQuery(GET_POST_RELEVANCE, {
        variables: {
            postId
        },
        skip: !postId,
        onCompleted: data => {
            if (data && data.getPostRelevancePerUserInterests) {
                const newInterests = [];
                const newScores = [];

                const topInterests = data.getPostRelevancePerUserInterests
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 50)
                    .sort(() => Math.random() - 0.5) // Randomize interest placement on chart
                for (const e of topInterests) {
                    newInterests.push(e.interest);
                    newScores.push(e.score);
                }
                setRelevance(newInterests);
                setScore(newScores);
            }
        },
        fetchPolicy: `cache-and-network`,
        notifyOnNetworkStatusChange: true,
    });

    if (!score.length) return null;

    return (<>
        <StyledDiv>
            <p>Post relation to your interests</p>
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
                        fontColor: theme.color_text,
                    }
                },
                elements: {
                    line: {
                        backgroundColor: `#ec628333`,
                        borderColor: `#ec6283`,
                    },
                    point: {
                        borderColor: `#ec6283`,
                        hoverRadius: 1,
                        hoverBorderWidth: 1,
                        borderWidth: 1,
                    }
                },
                tooltips: {
                    enabled: false
                }
            }} data={{
                labels: relevance,
                datasets: [{
                    data: score
                }]
            }} />
        </StyledDiv>
    </>);
};

export default ThemedRelevanceChart