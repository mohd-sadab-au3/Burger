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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresIn");
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

export const authExpiresTime = () => {

    return dispatch => {
        let expiresIn = null;
        if (localStorage.getItem("expiresIn")) {

            expiresIn = new Date(localStorage.getItem("expiresIn"))

            if (expiresIn > new Date()) {

                dispatch(authSuccess(localStorage.getItem("token"), localStorage.getItem("userId")));

                dispatch(authFinished((expiresIn.getTime() - new Date().getTime()) / 1000));
            }
            else {
                dispatch(logOut());

            }
        }
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
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authFinished(response.data.expiresIn))
                localStorage.setItem("token", response.data.idToken);
                let expires = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("expiresIn", expires)
                localStorage.setItem("token", response.data.idToken)
                localStorage.setItem("userId", response.data.localId)
                //dispatch(authExpiresTime());

            }).catch(error => {
                dispatch(authFail(error.response.data.error));
            })

    }
}

