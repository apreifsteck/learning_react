import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        Salad: 1,
        Bacon: 1,
        Cheese: 1,
        Meat: 1
    },
    totalPrice: 6.5
}

const INGREDIENT_PRICES = {
    Base: 6,
    Salad: .2,
    Bacon: .5,
    Cheese: .1,
    Meat: 1
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            // Have to do a deep copy
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // ES6 syntax to dynamically select a value to override
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // ES6 syntax to dynamically select a value to override
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state
    }
}

export default reducer