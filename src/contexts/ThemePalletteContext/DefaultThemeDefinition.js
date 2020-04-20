/**
 * This file holds the default theme config used across the app
 */
const colorPallette = {
    /**
     * The colors here need to be in 6 letter hex form,
     * else `color_text_faded` will break (see below)
     */

    color_1: `#ffffff`,
    color_2: `#212529`,
    color_3: `#002447`,
    color_4: `#53d3d1`,
    color_5: `#fbeceb`,
    color_6: `#feb249`,
}

/** 
 * These are fonts that get pre-downloaded from "layout.css".
 * If you want to add or remove any font, you should change "layout.css" as well
 */
export const availableFonts = [`Roboto`, `Tangerine`, `Trade Winds`,
    `Krona One`, `Akronim`, `Inconsolata`]
    
/**
 * The default theme used in the ThemePalletteContext
 */
export default {
    font_family: availableFonts[0],
    font_size: 18,
    color_background: colorPallette.color_1,
    color_text: colorPallette.color_2,
    color_text_faded: `${colorPallette.color_2}66`, // add alpha to primary text color
}