import {
    SUCCESS_REGISTRATION,
    ERROR_REGISTRATION,
    CLEAR_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    AUTHENTICATED_USER,
    LOGOUT,
} from 'types'
import tokenAuth from 'config/tokenAuth'

export default (state, action) => {
    switch (action.type) {
        case SUCCESS_REGISTRATION:
        case ERROR_REGISTRATION:
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload,
                authLoading: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                authenticated: true,
                authLoading: false,
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                authLoading: false,
            }
        case LOGOUT:
            localStorage.removeItem('token')
            tokenAuth(null)
            return {
                ...state,
                token: null,
                authenticated: false,
                user: null,
                authLoading: false,
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
            }
        default:
            return state
    }
}
