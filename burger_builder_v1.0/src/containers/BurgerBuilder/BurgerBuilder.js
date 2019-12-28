import React, { Component } from 'react';

import Aux from '../../hocs/Aux/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumamry'

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
        totalPrice: INGREDIENT_PRICES.Base,
        purchasable: false,
        inCheckout: false
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((acc, cur) => (acc + cur), 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newIngredientCount;
        const newCost = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients: newIngredients, totalPrice: newCost });

        this.updatePurchasable(newIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const newIngredientCount = this.state.ingredients[type] - 1;
            const newIngredients = { ...this.state.ingredients };
            newIngredients[type] = newIngredientCount;
            const newCost = this.state.totalPrice - INGREDIENT_PRICES[type]
            this.setState({ ingredients: newIngredients, totalPrice: newCost })

            this.updatePurchasable(newIngredients);
        }
    }

    toggleCheckout = () => {
        this.setState({ inCheckout: !this.state.inCheckout })
        // this.setState({ inCheckout: true })
    }

    continueHandler = () => {
        alert('This will go to final checkout');
    }

    render() {

        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal
                    modalClosed={this.toggleCheckout}
                    show={this.state.inCheckout}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        total={this.state.totalPrice}
                        cancel={this.toggleCheckout}
                        continue={this.continueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    isPurchasable={this.state.purchasable}
                    enterCheckout={this.toggleCheckout}
                />
            </Aux>
        );

    }
}

export default BurgerBuilder;