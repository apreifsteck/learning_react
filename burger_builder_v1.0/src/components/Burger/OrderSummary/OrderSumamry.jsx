import React from 'react';

import Aux from '../../../hocs/Aux/Aux'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((key) => {
            return <li key={key}>{key}: {props.ingredients[key]}</li>
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Here is your burger with these ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total: <strong>${props.total.toFixed(2)}</strong></p>
            <Button clicked={props.cancel} btnType={"Danger"}>CANCEL</Button>
            <Button clicked={props.continue} btnType={"Success"}>CONTINUE</Button>
        </Aux >
    );
};
export default orderSummary;