import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {

    return {

        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {

    return {

        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () => {

    return {
        type: actionTypes.LOG_OUT
    }
}

export const authFinished = (expirationTime) => {

    return dispatch => {

        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime * 1000);
    }
}



export const auth = (email, password, isSignUp) => {

    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvRUblL3Rb6as3ESIuX6ReTLXnncWXwwA';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvRUblL3Rb6as3ESIuX6ReTLXnncWXwwA'
        }
        axios.post(url, data)
            .then((response) => {
                console.log(response.data)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authFinished(response.data.expiresIn))
            }).catch(error => {
                console.log(error.response.data.error);
                dispatch(authFail(error.response.data.error));
            })

    }
}

