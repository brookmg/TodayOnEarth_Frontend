import React from 'react'
/* 
This should help keep the code clean by setting margin for 
every single child of this component
*/

const Margin = (props) => {

    const marginVertical = props.vertical;
    const marginHorizontal = props.horizontal;


    const marginTop = props.top || marginVertical;
    const marginBottom = props.bottom || marginVertical;
    const marginRight = props.right || marginHorizontal;
    const marginLeft = props.left || marginHorizontal;



    const childrenWithMargin = React.Children.map(props.children, child => child &&
        React.cloneElement(child, {
            style: {
                ...child.props.style,

                margin: props.all,

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