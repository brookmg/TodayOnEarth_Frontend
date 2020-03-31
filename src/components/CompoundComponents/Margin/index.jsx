/**
 * This component is used to help keep the code clean by setting margin for 
 * every single one of its children
 */
import React from "react";


/**
 * 
 * @param {string|number} vertical Top and bottom margin to apply to children
 * @param {string|number} horizontal Left and right margin to apply to children
 * @param {string|number} top Top margin to apply to children
 * @param {string|number} bottom Bottom margin to apply to children
 * @param {string|number} right Right margin to apply to children
 * @param {string|number} left Left margin to apply to children
 * @param {React.ElementType} children This component's children
 */
const Margin = ({ vertical, horizontal, top, bottom, right, left, children }) => {

    const marginVertical = vertical;
    const marginHorizontal = horizontal;

    const marginTop = top || marginVertical;
    const marginBottom = bottom || marginVertical;
    const marginRight = right || marginHorizontal;
    const marginLeft = left || marginHorizontal;

    const childrenWithMargin = React.Children.map(children, child => child &&
        React.cloneElement(child, {
            style: {
                ...child.props.style,

                marginTop,
                marginBottom,
                marginRight,
                marginLeft,
            }
        })
    );

    return (
        <>
            {childrenWithMargin}
        </>
    )

}

export default Margin;