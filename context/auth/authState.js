import { useReducer } from 'react'
import axiosClient from 'config/axios'
import tokenAuth from 'config/tokenAuth'

import AuthContext from './authContext'
import authReducer from './authReducer'

import {
    SUCCESS_REGISTRATION,
    ERROR_REGISTRATION,
    CLEAR_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    AUTHENTICATED_USER,
    LOGOUT,
} from 'types'

const AuthState = ({ children }) => {
    const initialState = {
        token:
            typeof window !== 'undefined'
                ? localStorage.getItem('token')
                : null,
        authenticated: false,
        user: null,
        message: null,
        authLoading: true,
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async user => {
        try {
            const { data } = await axiosClient.post('/users', user)
            dispatch({
                type: SUCCESS_REGISTRATION,
                payload: data.msg,
            })
        } catch (error) {
            dispatch({
                type: ERROR_REGISTRATION,
                payload: error.response.data.msg,
            })
        }

        // Clear message after 3 seconds
        setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000)
    }

    const logIn = async user => {
        try {
            const { data } = await axiosClient.post('/auth', user)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.token,
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg,
            })
        }

        // Clear message after 3 seconds
        setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 3000)
    }

    const logOut = () => {
        dispatch({
            type: LOGOUT,
        })
    }

    const getUser = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch({ type: LOGOUT })

        tokenAuth(token)
        try {
            const { data } = await axiosClient.get('/auth')
            dispatch({
                type: AUTHENTICATED_USER,
                payload: data.user,
            })
        } catch (error) {
            dispatch({ type: LOGOUT })
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                authLoading: state.authLoading,
                registerUser,
                logIn,
                getUser,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState
