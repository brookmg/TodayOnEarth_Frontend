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