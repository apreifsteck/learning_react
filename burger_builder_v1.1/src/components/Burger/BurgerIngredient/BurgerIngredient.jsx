import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css'

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case "BreadBottom":
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case "BreadTop":
            ingredient = (<div className={classes.BreadTop}>
                <div className={classes.Seeds1} />
                <div className={classes.Seeds2} />
            </div>
            );
            break;
        case "Meat":
            ingredient = <div className={classes.Meat}></div>;
            break;
        case "Cheese":
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case "Salad":
            ingredient = <div className={classes.Salad}></div>;
            break;
        case "Bacon":
            ingredient = <div className={classes.Bacon}></div>;
            break;
        default:
            break;
    }


    return (
        ingredient
    );
};

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default burgerIngredient;