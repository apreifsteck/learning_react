import React, { Component } from 'react';
import axios from '../../axios'

import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {
    state = {
        orders: null,
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const orders = []
                for (let [key, ob] of Object.entries(response.data)) {
                    orders.push(<Order
                        key={key}
                        ingredients={ob.ingredients}
                        price={ob.price.toFixed(2)}
                    />)
                }
                this.setState({ orders: orders, loading: false })
            })
            .catch(err => {
                // console.log(err) 
                // Normally you would log the error in your error logger!
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);