import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import withQueryParsedURL from "../../components/HOCs/withQueryParsedURL"
import {
    CardBody,
    Button,
    FormCheckbox,
} from "shards-react";
import Margin from "../../components/CompoundComponents/Margin"
import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext"
import DefaultThemeDefinition, { availableFonts } from "../../components/Contexts/ThemePalletteContext/DefaultThemeDefinition"
import ButtonDark from "../../components/UIElements/ButtonDark"
import ButtonSuccess from "../../components/UIElements/ButtonSuccess"
import { isBrowser } from "../../utils"
import UserInterestEntry from "../../components/UIElements/UserInterestEntry"
import ThemedCard from "../../components/UIElements/ThemedCard";
import ThemedCardTitle from "../../components/UIElements/ThemedCardTitle";


const ThemePreferenceSection = (props) => {
    const theme = React.useContext(ThemePalletteContext)

    const handleBGColorChange = (e) =>
        theme.setTheme({ ...theme, color_background: e.target.value })

    const handleTextColorChange = (e) =>
        theme.setTheme({ ...theme, color_text: e.target.value })

    const handleTextFadedColorChange = (e) =>
        theme.setTheme({ ...theme, color_text_faded: e.target.value })

    const handleFontChange = (e) =>
        theme.setTheme({ ...theme, font_family: e.target.value })

    const handleThemePreviewOriginalDayClick = () =>
        theme.setTheme({ ...DefaultThemeDefinition })

    const handleThemePreviewOriginalNightClick = () =>
        theme.setTheme({
            ...DefaultThemeDefinition,
            color_background: DefaultThemeDefinition.color_text,
            color_text: DefaultThemeDefinition.color_background,
            color_text_faded: `${DefaultThemeDefinition.color_background}66`,
        })

    const handleThemeApplyPermanentlyClick = () => {
        if (isBrowser()) {
            localStorage.setItem("theme", JSON.stringify(theme))
            alert("Theme applied successfully")
        }
    }

    return (
        <div>
            <Margin vertical="1rem">
                <ThemedCard>
                    <CardBody>
                        <Margin bottom="1rem">

                            <div>
                                <ThemedCardTitle style={{
                                    color: theme.color_text
                                }}>Site Theme</ThemedCardTitle>
                                <div>

                                    <select onChange={handleFontChange}>
                                        {
                                            availableFonts.map((font) => {
                                                return (
                                                    <option style={{ fontFamily: font }} key={font}>{font}</option>
                                                )
                                            })

                                        }
                                    </select>
                                    <Margin left="0.5rem">
                                        <span>Font Style</span>
                                    </Margin>
                                </div>

                            </div>
                        </Margin>



                        <div>
                            <div>

                                <div>
                                    <input type="color"
                                        value={theme.color_background}
                                        onChange={handleBGColorChange} />
                                    <Margin left="0.5rem">
                                        <span>Background Color</span>
                                    </Margin>
                                </div>
                                <div>
                                    <input type="color"
                                        value={theme.color_text}
                                        onChange={handleTextColorChange} />
                                    <Margin left="0.5rem">
                                        <span>Text Color</span>
                                    </Margin>
                                </div>
                                <div>
                                    <input type="color"
                                        value={theme.color_text_faded}
                                        onChange={handleTextFadedColorChange} />
                                    <Margin left="0.5rem">
                                        <span>Text Color Faded</span>
                                    </Margin>
                                </div>
                            </div>

                        </div>

                        <Margin vertical="0.5em">
                            <div style={{ color: theme.color_text_faded }}>
                                <i>
                                    Note: Theme will not be permanent till you apply the changes.
                                </i>
                            </div>
                        </Margin>

                        <div>
                            <Margin horizontal="0.5rem" vertical="0.5rem">
                                <div>
                                    <Margin right="0.5rem">
                                        <ButtonDark onClick={handleThemePreviewOriginalDayClick}>
                                            🔆 Try Day Theme
                                        </ButtonDark>

                                        <ButtonDark onClick={handleThemePreviewOriginalNightClick}>
                                            🌙 Try Night Theme
                                        </ButtonDark>
                                    </Margin>

                                </div>
                                <ButtonSuccess onClick={handleThemeApplyPermanentlyClick}>
                                    Apply Permanently
                                </ButtonSuccess>
                            </Margin>
                        </div>

                    </CardBody>
                </ThemedCard>

            </Margin>
        </div>

    )

}
const ContentSourceSection = (props) => {

    const handleCheckBoxChange = (event, name) => {

        const isChecked = checkedItems[name]

        setCheckedItems({ ...checkedItems, [name]: !isChecked });
    }

    const allContentSources = ['BillGates@facebook', 'meme@telegram']

    const [checkedItems, setCheckedItems] = React.useState({});

    return (
        <div>
            <Margin vertical="1rem">
                <ThemedCard>
                    <CardBody>
                        <Margin bottom="1rem">

                            <div>
                                <ThemedCardTitle>Content sources</ThemedCardTitle>
                                <div>

                                    {
                                        allContentSources.map(e => (
                                            <FormCheckbox
                                                inline
                                                key={e}
                                                checked={!!checkedItems[e]}
                                                onChange={ev => handleCheckBoxChange(ev, e)}
                                            >
                                                {e}
                                            </FormCheckbox>

                                        ))
                                    }

                                </div>

                            </div>
                        </Margin>
                    </CardBody>
                </ThemedCard>

            </Margin>
        </div>

    )

}

const UserInterestEntrySection = () => <UserInterestEntry />

const SearchPage = withQueryParsedURL((props) => (
    <Layout>
        <SEO title="Home" />

        <UserInterestEntrySection />

        <ThemePreferenceSection />

        <ContentSourceSection />

        <div>
            <Margin all="0.5rem">
                <Button theme="dark">Revert Changes</Button>
                <Button theme="success">Apply Changes</Button>
            </Margin>
        </div>
    </Layout>
))

export default SearchPage
