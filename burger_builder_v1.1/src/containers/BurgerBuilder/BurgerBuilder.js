import React, { Component } from 'react';
import axios from '../../axios'

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'

import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler'
import Aux from '../../hocs/Aux/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumamry'
import Spinner from '../../components/UI/Spinner/Spinner'


class BurgerBuilder extends Component {

    state = {
        // ingredients: null,        
        purchasable: false,
        inCheckout: false,
        loading: false,
        err: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(resp => {
        //         this.setState({ ingredients: resp.data })
        //         this.updatePurchasable(resp.data)
        //     }).catch(err => {
        //         console.log(err)
        //         this.setState({ err: true })
        //     })
        // console.log(this.props)
    }


    updatePurchasable = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((acc, cur) => (acc + cur), 0)
        return sum > 0
    }

    toggleCheckout = () => {
        this.setState({ inCheckout: !this.state.inCheckout })
        // this.setState({ inCheckout: true })
    }

    continueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = { ...this.props.ings }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.err ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.props.ings) {
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        isPurchasable={this.updatePurchasable(this.props.ings)}
                        enterCheckout={this.toggleCheckout}
                    />
                </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                total={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));