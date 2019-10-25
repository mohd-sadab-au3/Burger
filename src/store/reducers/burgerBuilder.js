import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 30,
    error: false,
    building: false
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
                totalPrice: INGREDIENTS_PRICE[action.ingredientName] + state.totalPrice,
                building: true

            }
        case actionType.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                building: true

            }

        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 30,
                error: false,
                building: false
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

