import React from 'react';

import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'Salad' },
    { label: 'Meat', type: 'Meat' },
    { label: 'Cheese', type: 'Cheese' },
    { label: 'Bacon', type: 'Bacon' },
]

const buildControls = (props) => {

    const jsxControls = controls.map((item, i) => {
        return <BuildControl
            label={item.label}
            key={i}
            added={props.ingredientAdded.bind(this, item.type)}
            removed={props.ingredientRemoved.bind(this, item.type)}
            disabled={props.disabledInfo[item.type]}
        />
    })

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {jsxControls}
            <button
                className={classes.OrderButton}
                disabled={!props.isPurchasable}
                onClick={props.enterCheckout} >ORDER BURGER</button>
        </div>
    );
};
export default buildControls;