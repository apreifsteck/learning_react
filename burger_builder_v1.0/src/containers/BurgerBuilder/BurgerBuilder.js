import React, { Component } from 'react';

import Aux from '../../hocs/Aux'

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            Salad: 0,
            Bacon: 0,
            Cheese: 0,
            Meat: 0,
        }
    }

    render() {
        return (
            <Aux>
                <div>Burger</div>
                <Burger ingredients={this.state.ingredients} />
                <div>Builder controls</div>
            </Aux>
        );

    }
}

export default BurgerBuilder;