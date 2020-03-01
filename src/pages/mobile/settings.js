import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import withQueryParsedURL from "../../components/HOCs/withQueryParsedURL"
import {
    Card,
    CardTitle,
    CardBody,
    Button,
    FormCheckbox
} from "shards-react";
import Margin from "../../components/CompoundComponents/Margin"
import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext"
import { availableFonts } from "../../components/Contexts/ThemePalletteContext/DefaultThemeDefinition"

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

    return (
        <div>
            <Margin vertical="1rem">
                <Card>
                    <CardBody>
                        <Margin bottom="1rem">

                            <div>
                                <CardTitle>Site Theme</CardTitle>
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



                    </CardBody>
                </Card>

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
                <Card>
                    <CardBody>
                        <Margin bottom="1rem">

                            <div>
                                <CardTitle>Content sources</CardTitle>
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
                </Card>

            </Margin>
        </div>

    )

}

const SearchPage = withQueryParsedURL((props) => (
    <Layout>
        <SEO title="Home" />

        <ThemePreferenceSection />

        <ContentSourceSection />

        <div>
            <Margin all="0.5rem">
                <Button theme="dark">Revert Changes</Button>
                <Button theme="success">Apply Changes</Button>
            </Margin>
        </div>

        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
))

export default SearchPage
