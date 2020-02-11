import React from 'react';

import classes from './Order.module.css'

const order = (props) => {
    const ingredientEls = [];
    console.log(props.ingredients)
    for (let [ing, num] of Object.entries(props.ingredients)) {
        ingredientEls.push(<li key={ing + num}>{ing}: {num}</li>)
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>
            <ul>
                {ingredientEls}
            </ul>
            <p>Price: $<strong>{props.price}</strong></p>
        </div>
    );
};
export default order;