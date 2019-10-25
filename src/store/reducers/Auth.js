import * as actionTypes from '../actions/actionTypes';
import updatedObject from '../utility';
let initialState = {
    token: null,
    error: null,
    userId: null,
    loading: false
}

const authStart = (state, action) => {

    return (updatedObject(state, { error: null, loading: true }));
}

const authSuccess = (state, action) => {

    return ({

        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    }
    )
}

const authFail = (state, action) => {

    return ({
        error: action,
        loading: false,
        token: null,
        userId: null
    })
}

const authLogOut = (state, action) => {

    return ({
        token: null,
        userId: null,
        loading: false,
        error: false
    })
}

const reducer = (state = initialState, action) => {


    switch (action.type) {


        case actionTypes.AUTH_START:
            return authStart(state, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_FAIL:
            return authFail(state, action.error);

        case actionTypes.LOG_OUT:
            return (authLogOut(state, action));

        default:
            return state;


    }




}

export default reducer;