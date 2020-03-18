import React from "react";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import styled from "styled-components";
import Margin from "./CompoundComponents/Margin";
import ThemePalletteContext from "../contexts/ThemePalletteContext";
import ButtonDark from "./ButtonDark";
import ButtonSuccess from "./ButtonSuccess";
import ThemedCard from "./ThemedCard";
import ThemedCardTitle from "./ThemedCardTitle";
import { CardBody, FormInput, FormSelect } from "shards-react";
import { isBrowser } from "../utils";
import DefaultThemeDefinition, { availableFonts } from "../contexts/ThemePalletteContext/DefaultThemeDefinition";



const StyledSelect = styled(FormSelect)`
    width: auto;
`

const ThemePreferenceSection = (props) => {
    const theme = React.useContext(ThemePalletteContext);
    const handleBGColorChange = (e) => theme.setTheme({ ...theme, color_background: e.target.value });
    const handleTextColorChange = (e) => theme.setTheme({ ...theme, color_text: e.target.value });
    const handleTextFadedColorChange = (e) => theme.setTheme({ ...theme, color_text_faded: e.target.value });
    const handleFontChange = (e) => theme.setTheme({ ...theme, font_family: e.target.value });
    const handleFontSizeChange = (e) => theme.setTheme({ ...theme, font_size: e.target.value });
    const handleThemePreviewOriginalDayClick = () => theme.setTheme({ ...DefaultThemeDefinition });
    const handleThemePreviewOriginalNightClick = () => theme.setTheme({
        ...DefaultThemeDefinition,
        color_background: DefaultThemeDefinition.color_text,
        color_text: DefaultThemeDefinition.color_background,
        color_text_faded: `${DefaultThemeDefinition.color_background}66`,
    });
    const handleThemeApplyPermanentlyClick = () => {
        if (isBrowser()) {
            localStorage.setItem(`theme`, JSON.stringify(theme));
            alert(`Theme applied successfully`);
        }
    };
    return (<div>
        <Margin vertical={`1rem`}>
            <ThemedCard>
                <CardBody>
                    <Margin bottom={`1rem`}>

                        <div>
                            <ThemedCardTitle style={{
                                color: theme.color_text
                            }}>Site Theme</ThemedCardTitle>
                            <div>

                                <StyledSelect onChange={handleFontChange}>
                                    {availableFonts.map((font) => {
                                        return (<option style={{ fontFamily: font }} key={font}>{font}</option>);
                                    })}
                                </StyledSelect>
                                <Margin horizontal={`0.5rem`}>
                                    <span>Font Style</span>
                                </Margin>

                                <FormInput value={theme.font_size} onChange={handleFontSizeChange} style={{ width: `110px`, display: `inline` }} type={`number`} />
                                <Margin vertical={`0.5rem`} horizontal={`0.5rem`}>
                                    <span>Font Size</span>
                                </Margin>
                            </div>

                        </div>
                    </Margin>



                    <div>
                        <div>

                            <div>
                                <input type={`color`} value={theme.color_background} onChange={handleBGColorChange} />
                                <Margin left={`0.5rem`}>
                                    <span>Background Color</span>
                                </Margin>
                            </div>
                            <div>
                                <input type={`color`} value={theme.color_text} onChange={handleTextColorChange} />
                                <Margin left={`0.5rem`}>
                                    <span>Text Color</span>
                                </Margin>
                            </div>
                            <div>
                                <input type={`color`} value={theme.color_text_faded} onChange={handleTextFadedColorChange} />
                                <Margin left={`0.5rem`}>
                                    <span>Text Color Faded</span>
                                </Margin>
                            </div>
                        </div>

                    </div>

                    <Margin vertical={`0.5em`}>
                        <div style={{ color: theme.color_text_faded }}>
                            <i>
                                Note: Theme will not be permanent till you apply the changes.
                                </i>
                        </div>
                    </Margin>

                    <div>
                        <Margin horizontal={`0.5rem`} vertical={`0.5rem`}>
                            <div>
                                <Margin right={`0.5rem`} vertical={`0.5em`}>
                                    <ButtonDark onClick={handleThemePreviewOriginalDayClick}>
                                        <WbSunnyIcon /> Try Day Theme
                                        </ButtonDark>

                                    <ButtonDark onClick={handleThemePreviewOriginalNightClick}>
                                        <NightsStayIcon /> Try Night Theme
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
    </div>);
};

export default ThemePreferenceSection