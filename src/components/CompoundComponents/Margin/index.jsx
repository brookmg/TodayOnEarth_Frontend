import React from "react";


/* 
This should help keep the code clean by setting margin for 
every single child of this component
*/

const Margin = ({ vertical, horizontal, top, bottom, right, left, children, all }) => {

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

                margin: all,

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