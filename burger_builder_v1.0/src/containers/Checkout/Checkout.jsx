import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for (let [ingredient, num] of query) {
            if (ingredient === 'price') {
                price = +num;
                continue;
            }
            ingredients[ingredient] = +num;
        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.path + '/contact-info')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route
                    path={this.props.match.url + "/contact-info"}
                    render={() => <ContactData ingredients={this.state.ingredients} />}
                    price={this.state.totalPrice}
                />
            </div>
        );
    }
}
export default Checkout;