import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {

    console.log(state.purchased, action.type);
    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            return {
                ...state
                , purchased: false,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                id: action.orderId,
                ...action.orderData,

            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }

}

export default reducer;