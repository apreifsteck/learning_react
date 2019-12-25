import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((ingKey) => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
        })
    }).reduce((arr, el) => (arr.concat(el)));

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"BreadTop"} />
            {transformedIngredients}
            <BurgerIngredient type={"BreadBottom"} />
        </div>
    );
};
export default burger;