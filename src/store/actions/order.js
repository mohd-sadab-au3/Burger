import * as actionTypes from './actionTypes';

import axiosInstance from '../../axios-orders';

export const purchaseInit = () => {

    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData) => {

    return dispatch => {
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                purchaseBurgerSuccess(response.data, orderData);
            })
            .catch(error => {
                purchaseBurgerFail(error);
            });
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}