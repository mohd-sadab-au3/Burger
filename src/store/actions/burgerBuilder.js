import * as actionTypes from './actionTypes';

import axiosInstance from '../../axios-orders';

export const addIngredient = (ingName) => {

    return {

        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = ingName => {
    return {

        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }

}

const setIngredients = ingredients => {

    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {

    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {

    return dispatch => {

        axiosInstance.get("https://burger-builder-ca35c.firebaseio.com/ingredients.json").then(res => {

            console.log(res);
            dispatch(setIngredients(res.data));
        }).catch(error => {

            dispatch(fetchIngredientsFailed())
            console.log(error)
        });


    }
}