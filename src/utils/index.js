/**
 * This function provides a cleaner way to get an attribute from an object
 * 
 * @param {object} obj 
 * @param {string} attribute 
 * @param {any} defaultValue 
 * @returns the value for the attribute you requested, or the defaultValue
 */
export const getIfAvailable = (obj, attribute = "", defaultValue) => {

    const keys = attribute.split(".")
    while (keys.length !== 0) {
        obj = obj[keys.shift()]
        if (typeof obj === "undefined")
            return defaultValue
    }

    return obj
}

export const ellipsedSubstring = (str, maxChars = 50) => {
    if (str.length > maxChars)
        str = `${str.substr(0, maxChars)} ...`

    return str
}

export const isBrowser = () => typeof window !== "undefined"

export const removeRedundantWhitespace = (str) => {
    return str.replace(/\s+/g, ` `)
}

export const convertDateToInputFormat = (d) => {
    const date = new Date(d)
    try {
        return date.toISOString().split(`T`)[0]
    }
    catch (e) {
        console.error(e)
    }
}

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
        color = +("0x" + color.slice(1).replace(
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