import React, { Component } from 'react';
import axios from '../../axios'

import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler'
import Aux from '../../hocs/Aux/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumamry'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    Base: 6,
    Salad: .2,
    Bacon: .5,
    Cheese: .1,
    Meat: 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: INGREDIENT_PRICES.Base,
        purchasable: false,
        inCheckout: false,
        loading: false,
        err: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(resp => {
                this.setState({ ingredients: resp.data })
                this.updatePurchasable(resp.data)
            }).catch(err => {
                console.log(err)
                this.setState({ err: true })
            })
        console.log(this.props)
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
        // alert('This will go to final checkout');
        /***
         * this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            cust: {
                name: "Austin",
                address: {
                    street: "a street",
                    city: "Cbus",
                    state: "Ohiogozimasu",
                    zip: "43210"
                },
                email: "apreifsteck@trashcan.com",
                phone: "513-xxx-xxxx"
            },
            deliveryMethod: "Fastest"
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                alert("Your burger has been ordered!");
                this.toggleCheckout()
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
                this.toggleCheckout();
                this.setState({ loading: false });
            })
         */
        const params = [];
        for (let i in this.state.ingredients) {
            params.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + params.join('&')
        })
    }

    render() {

        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.err ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger =
                <Aux>
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
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                total={this.state.totalPrice}
                cancel={this.toggleCheckout}
                continue={this.continueHandler} />

            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }

        return (
            <Aux>
                <Modal
                    modalClosed={this.toggleCheckout}
                    show={this.state.inCheckout}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }
}

export default withErrorHandler(BurgerBuilder, axios);