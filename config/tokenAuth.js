import axiosClient from './axios'

const tokenAuth = token => {
    if (token) {
        // Set token to Auth header
        axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        // Delete token from Auth header
        delete axiosClient.defaults.headers.common.Authorization
    }
}

export default tokenAuth
