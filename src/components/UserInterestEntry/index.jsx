import React from "react";
import Margin from "../CompoundComponents/Margin";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import ButtonInterest from "../ButtonInterest";
import ThemedCard from "../ThemedCard";
import ThemedCardTitle from "../ThemedCardTitle";
import ButtonDark from "../ButtonDark";
import ButtonSuccess from "../ButtonSuccess";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { isLoggedIn } from "../../services/auth";
import { removeRedundantWhitespace, isBrowser } from "../../utils";
import {
    CardBody,
    Button,
    Slider,
    FormInput
} from "shards-react";
import { StyledDiv } from "./styles";
import { GET_USER_INTERESTS, UPDATE_USER_INTERESTS } from "./queries";


const UserInterestEntry = (props) => {
    const theme = React.useContext(ThemePalletteContext)


    const [interestInputText, setInterestInputText] = React.useState(``)
    const [interestScore, setInterestScore] = React.useState(0)
    const [interestMap, setInterestMap] = React.useState({})
    const [selectedInterest, setSelectedInterest] = React.useState(``)

    const { loading, error, refetch } = useQuery(GET_USER_INTERESTS,
        {
            onCompleted: data => {
                if (isLoggedIn() && data && data.getUser.interests) {
                    const serverSideInterests = {}
                    data.getUser.interests.forEach(e => serverSideInterests[e.interest] = e.score)
                    setInterestMap(serverSideInterests)
                    if (selectedInterest)
                        setInterestScore(serverSideInterests[selectedInterest])
                }
            },

            notifyOnNetworkStatusChange: true,
            fetchPolicy: `no-cache`
        });
    const [updateInterests, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER_INTERESTS, {
        onCompleted: (data) =>
            data.cleanUpdateInterestList &&
            toast(`Applied changes successfully`, {
                type: toast.TYPE.SUCCESS
            })
    });

    const handleSlide = (e) => {
        const score = parseFloat(e[0])
        setInterestScore(score)
        setInterestMap({ ...interestMap, [selectedInterest]: score })
    }
    const handleInterestButtonClick = (interest) => {
        setSelectedInterest(interest)
        setInterestScore(interestMap[interest])
    }
    const handleInterestButtonClose = (interest) => {
        if (isBrowser() && !window.confirm(`Remove interest "${interest}"?`)) return;

        delete interestMap[interest]
        setInterestMap({ ...interestMap })
    }
    const handleInterestChange = (e) => {
        setInterestInputText(e.target.value)
    }
    const handleInterestKeyDown = (e) => {
        if (e.key === `Enter` || e.key === ` `) {
            removeRedundantWhitespace(interestInputText).
                split(` `).forEach((e) => {
                    if (!interestMap[e]) interestMap[e] = 0
                })

            setInterestInputText(``)
            e.preventDefault();
        }
    }
    const handleRevertClicked = () => isLoggedIn() && refetch()
    const handleUpdateClicked = () => {
        const interests = []

        Object.keys(interestMap).forEach(e => {
            interests.push({
                interest: e,
                score: interestMap[e]
            })
        })

        updateInterests(
            {
                variables: { interests }
            });
    }

    if (!isLoggedIn()) return null
    return (
        <div>
            <Margin vertical={`1rem`}>
                <ThemedCard>
                    <CardBody>
                        <Margin bottom={`1rem`}>

                            <div>
                                <ThemedCardTitle>Your interests</ThemedCardTitle>
                                <div>

                                    <FormInput placeholder={`Add Interest`}
                                        value={interestInputText}
                                        onChange={handleInterestChange}
                                        type={`text`}
                                        size={`sm`}
                                        plaintext={false}
                                        onKeyDown={handleInterestKeyDown}
                                    />

                                    {
                                        <Margin vertical={`1em`}>
                                            <div>

                                                {selectedInterest &&
                                                    <div>
                                                        <ThemedCardTitle>How interested are you about: "{selectedInterest}"</ThemedCardTitle>

                                                        <Margin horizontal={`0.5em`} vertical={`1em`}>
                                                            <div>
                                                                <Slider
                                                                    value={interestScore}
                                                                    theme={interestScore == 1 ? `success` : interestScore < 0 ? `danger` : `primary`}
                                                                    animate={true}
                                                                    pips={{ mode: `steps`, stepped: true, density: 50 }}
                                                                    onSlide={handleSlide}
                                                                    connect={[true, false]}
                                                                    start={[interestScore]}
                                                                    range={{ min: -1, max: 1 }}
                                                                />


                                                                <StyledDiv style={{ color: theme.color_text_faded }}>
                                                                    {
                                                                        interestScore < 0 ? `Never show me posts about this topic` :
                                                                            interestScore === 1 ? `Always show me posts about this topic` :
                                                                                `I'm somewhat interested in this topic`
                                                                    }
                                                                </StyledDiv>
                                                            </div>
                                                        </Margin>

                                                    </div>}
                                                <Margin horizontal={`0.5em`} vertical={`0.25em`}>
                                                    {
                                                        Object.keys(interestMap).map(e => e &&
                                                            <ButtonInterest
                                                                key={e}
                                                                onInterestClick={handleInterestButtonClick}
                                                                onInterestClose={handleInterestButtonClose}
                                                            >{e}</ButtonInterest>)
                                                    }
                                                </Margin>
                                            </div>
                                        </Margin>
                                    }
                                </div>

                            </div>


                        </Margin>
                        <div>
                            <Margin horizontal={`0.5rem`} vertical={`0.5em`} >
                                <ButtonDark onClick={handleRevertClicked}>Revert Changes</ButtonDark>
                                <ButtonSuccess onClick={handleUpdateClicked}>Update Interests</ButtonSuccess>
                            </Margin>
                        </div>
                        <div>
                            {loading && <p>Loading Interests...</p>}
                            {error && <p>Error: {error.message}</p>}
                            {mutationLoading && <p>Loading...</p>}
                            {mutationError && <p>Error :( Please try again</p>}
                        </div>
                    </CardBody>
                </ThemedCard>

            </Margin>
        </div>

    )

}

export default UserInterestEntry;