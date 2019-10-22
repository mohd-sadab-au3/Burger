import * as actionTypes from './actionTypes';

import axiosInstance from '../../axios-orders';


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

    console.log(orderData);
    return dispatch => {

        axiosInstance.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                purchaseBurgerSuccess(response.data.name, orderData);
            })
            .catch(error => {
                console.log(error);
                purchaseBurgerFail(error);
            });
    }
}

