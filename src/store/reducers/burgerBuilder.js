import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 30,
    error: false,
    loading: false
}

const INGREDIENTS_PRICE = {
    "salad": 10,
    "bacon": 15,
    "meat": 20,
    "cheese": 15,


}
const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: INGREDIENTS_PRICE[action.ingredientName] + state.totalPrice

            }
        case actionType.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]

            }

        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }

        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }

}

export default reducer;

