/**
 * This function provides a safe and clean way to get an attribute from an object
 * @param {object} obj Object that you want to get attributes from
 * @param {string} attribute A '.' separated string of attribute you want to get value of
 * @param {any} defaultValue Value returned when "attribute" is unavailable
 * @returns The value for the attribute you requested, or the defaultValue
 */
export const getIfAvailable = (obj, attribute = ``, defaultValue) => {

    const keys = attribute.split(`.`)
    while (keys.length !== 0) {
        obj = obj[keys.shift()]
        if (typeof obj === `undefined`)
            return defaultValue
    }

    return obj
}

/**
 * Transforms a long string into a shorter and ellipsed one
 * @param {string} str String to ellipse
 * @param {number} maxChars Maximum character count to show without ellipsing
 * @returns {string} An ellipsed string or the original string
 */
export const ellipsedSubstring = (str, maxChars = 50) => {
    if (str.length > maxChars)
        str = `${str.substr(0, maxChars)} ...`

    return str
}

/**
 * Checks if is running on node (SSR) or browser
 * @returns {boolean} True if running on browser
 */
export const isBrowser = () => typeof window !== `undefined`

/**
 * Converts consecutive whitespace characters into just a single one
 * @param {string} str String possibly containing redundant whitespace
 * @returns {string} A string without repeating whitespace characters
 */
export const removeRedundantWhitespace = (str) => {
    return str.replace(/\s+/g, ` `)
}

/**
 * Converts JS format date to 'dd-mm-yyyy' format thats used on HTML5 date input
 * @param {date} d JS format date 
 * @returns {string} A string with input date as 'dd-mm-yyyy' format
 */
export const convertDateToInputFormat = (d) => {
    const date = new Date(d)
    try {
        return date.toISOString().split(`T`)[0]
    }
    catch (e) {
        console.error(e)
    }
}

/**
 * Checks if provided color is a light color or a dark color
 * @param {string} color RGB or HEX representation of a color
 * @returns {boolean} True if color is considered dark
 */
export const isColorDark = (color) => {
    let r, g, b, hsp
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +(`0x` + color.slice(1).replace(
            color.length < 5 && /./g, `$&$&`
        )
        );

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) return false;
    else return true;

}