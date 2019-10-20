import * as actionType from '../action';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 30
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
        default:
            return state;
    }

}

export default reducer;

