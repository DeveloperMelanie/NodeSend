import { useReducer } from 'react'
import axiosClient from 'config/axios'

import AppContext from './appContext'
import appReducer from './appReducer'

import {
    SHOW_MESSAGE,
    CLEAR_MESSAGE,
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CLEAR_APP_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS,
} from 'types'

const AppState = ({ children }) => {
    const initialState = {
        fileMessage: null,
        name: '',
        originalName: '',
        loading: false,
        downloads: 1,
        password: '',
        author: null,
        url: '',
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const showMessage = msg => {
        dispatch({
            type: SHOW_MESSAGE,
            payload: msg,
        })

        // Clear message after 5 seconds
        setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 5000)
    }

    const uploadFile = async (file, originalName) => {
        dispatch({
            type: FILE_UPLOAD,
        })
        try {
            const { data } = await axiosClient.post('/files', file)
            dispatch({
                type: FILE_UPLOAD_SUCCESS,
                payload: {
                    name: data.file,
                    originalName,
                },
            })
            return {
                name: data.file,
            }
        } catch (error) {
            dispatch({
                type: FILE_UPLOAD_ERROR,
                payload: error.response.data.msg,
            })
        }
    }

    const createLink = async (file, originalFileName) => {
        const { name } = await uploadFile(file, originalFileName)

        const link = {
            name,
            originalName: originalFileName,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
        }

        try {
            const { data } = await axiosClient.post('/links', link)
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: data.url,
            })
        } catch (error) {
            dispatch({
                type: CREATE_LINK_ERROR,
                payload: error.response.data.msg,
            })
        }
    }

    const clearAppState = () => {
        dispatch({
            type: CLEAR_APP_STATE,
        })
    }

    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password,
        })
    }

    const addDownloads = downloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads,
        })
    }

    return (
        <AppContext.Provider
            value={{
                fileMessage: state.fileMessage,
                name: state.name,
                originalName: state.originalName,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showMessage,
                createLink,
                clearAppState,
                addPassword,
                addDownloads,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppState
