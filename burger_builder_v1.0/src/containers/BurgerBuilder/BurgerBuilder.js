import React, { Component } from 'react';

import Aux from '../../hocs/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    Base: 4,
    Salad: .2,
    Bacon: .5,
    Cheese: .1,
    Meat: 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            Salad: 0,
            Bacon: 0,
            Cheese: 0,
            Meat: 0,
        },
        totalPrice: INGREDIENT_PRICES.Base
    }

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newIngredientCount;
        const newCost = Object.keys(this.state.ingredients).map((key, i) => {
            return this.state.ingredients[key] * INGREDIENT_PRICES[key];
        }).reduce((acc, curVal) => {
            return acc + curVal
        }, INGREDIENT_PRICES.Base)

        this.setState({ ingredients: newIngredients, totalPrice: newCost })
    }

    render() {
        return (
            <Aux>
                <div>Burger</div>
                <Burger ingredients={this.state.ingredients} />
                <div>${this.state.totalPrice}</div>
                <div>Builder controls</div>
                <BuildControls click={this.addIngredientHandler} />
            </Aux>
        );

    }
}

export default BurgerBuilder;