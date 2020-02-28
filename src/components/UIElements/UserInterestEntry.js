import React from "react"
import {
    Card,
    CardTitle,
    CardBody,
    Button,
    Slider,
    FormInput
} from "shards-react";
import Margin from "../CompoundComponents/Margin"
import ThemePalletteContext from "../Contexts/ThemePalletteContext"
import { isLoggedIn } from "../../services/auth"
import { removeRedundantWhitespace, isBrowser } from "../../utils"
import ButtonInterest from './ButtonInterest'

const UserInterestEntry = (props) => {
    const theme = React.useContext(ThemePalletteContext)

    const [interestInputText, setInterestInputText] = React.useState("")
    const [interestScore, setInterestScore] = React.useState(0)
    const [interestMap, setInterestMap] = React.useState({})
    const [selectedInterest, setSelectedInterest] = React.useState("")

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
        if (e.key === 'Enter' || e.key === ' ') {
            removeRedundantWhitespace(interestInputText).
                split(" ").forEach((e) => {
                    if (!interestMap[e]) interestMap[e] = 0
                })

            setInterestInputText("")
            e.preventDefault();
        }
    }

    if (!isLoggedIn()) return null
    return (
        <div>
            <Margin vertical="1rem">
                <Card>
                    <CardBody>
                        <Margin bottom="1rem">

                            <div>
                                <CardTitle>Your interests</CardTitle>
                                <div>

                                    <FormInput placeholder={"Add Interest"}
                                        value={interestInputText}
                                        onChange={handleInterestChange}
                                        type="text"
                                        size="sm"
                                        plaintext={false}
                                        onKeyDown={handleInterestKeyDown}
                                    />

                                    {
                                        <Margin vertical="1em">
                                            <div>
                                                {selectedInterest &&
                                                    <div>
                                                        <CardTitle>How interested are you about: "{selectedInterest}"</CardTitle>

                                                        <Margin horizontal="0.5em" vertical="1em">
                                                            <div>
                                                                <Slider
                                                                    value={interestScore}
                                                                    theme={interestScore == 1 ? "success" : interestScore < 0 ? "danger" : "primary"}
                                                                    animate={true}
                                                                    pips={{ mode: "steps", stepped: true, density: 50 }}
                                                                    onSlide={handleSlide}
                                                                    connect={[true, false]}
                                                                    start={[interestScore]}
                                                                    range={{ min: -1, max: 1 }}
                                                                />


                                                                <div style={{ textAlign: 'center', color: theme.color_text_faded }}>
                                                                    {
                                                                        interestScore < 0 ? "Never show me posts about this topic" :
                                                                            interestScore === 1 ? "Always show me posts about this topic" :
                                                                                "I'm somewhat interested in this topic"
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Margin>

                                                    </div>}
                                                <Margin horizontal="0.5em" vertical="0.25em">
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
                            <Margin horizontal="0.5rem">
                                <Button theme="dark">Revert Changes</Button>
                                <Button theme="success">Update Interests</Button>
                            </Margin>
                        </div>
                    </CardBody>
                </Card>

            </Margin>
        </div>

    )

}

export default UserInterestEntry;