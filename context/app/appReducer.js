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

export default (state, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
        case FILE_UPLOAD_ERROR:
        case CREATE_LINK_ERROR:
            return {
                ...state,
                fileMessage: action.payload,
                loading: false,
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                fileMessage: null,
            }
        case FILE_UPLOAD:
            return {
                ...state,
                loading: true,
            }
        case FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                originalName: action.payload.originalName,
                loading: false,
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload,
            }
        case CLEAR_APP_STATE:
            return {
                ...state,
                fileMessage: null,
                name: '',
                originalName: '',
                loading: false,
                downloads: 1,
                password: '',
                author: null,
                url: '',
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload,
            }
        default:
            return state
    }
}
