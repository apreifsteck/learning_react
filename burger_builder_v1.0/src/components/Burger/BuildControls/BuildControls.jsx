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
        return <BuildControl label={item.label} type={item.type} key={i} />
    })

    return (
        <div className={classes.BuildControls}>
            {jsxControls}
        </div>
    );
};
export default buildControls;