import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import {toast} from "react-toastify"


const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null
    },

    reducers: {

        registerRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false,
            state.user = {}
        },

        registerSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true,
            state.user = action.payload.user
        },

        registerFailed(state,action){
            state.loading = false;
            state.isAuthenticated = false,
            state.user = {}
        },
        loginRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false,
            state.user = {}
        },

        loginSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true,
            state.user = action.payload.user
        },

        loginFailed(state,action){
            state.loading = false;
            state.isAuthenticated = false,
            state.user = {}
        },

        fetchUserRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false,
            state.user = {}
        },

        fetchUserSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true,
            state.user = action.payload.user
        },

        fetchUserFailed(state,action){
            state.loading = false;
            state.isAuthenticated = false,
            state.user = {}
        },

        logoutSuccess(state, action){
            state.isAuthenticated = false
            state.user = {}
        },

        logoutFailed(state, action){
            state.loading = false
            state.isAuthenticated = state.isAuthenticated
            state.user = state.user
        },

        clearAllErrors(state,action){
            state.user = state.user
            state.isAuthenticated = state.isAuthenticated
            state.loading = false
        }
    }   
})


export const register = (data) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest())
    try {
        const response = await axios.post
        (
            "http://localhost:7000/api/user/register", 
            data, 
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
        console.log(response)
        dispatch(userSlice.actions.registerSuccess(response?.data?.user))
        toast.success(response.data.message)
        dispatch(userSlice.actions.clearAllErrors())

    } catch (error) {

        dispatch(userSlice.actions.registerFailed())
        toast.error(error.response?.data?.message)
        dispatch(userSlice.actions.clearAllErrors())

    }
}

export const login = (data) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest())
    try {
        const response = await axios.post
        (
            "http://localhost:7000/api/user/login", 
            data, 
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            }
        )

        dispatch(userSlice.actions.loginSuccess(response?.data))
        toast.success(response?.data?.message)
        dispatch(userSlice.actions.clearAllErrors())

    } catch (error) {

        dispatch(userSlice.actions.loginFailed())
        toast.error(error.response?.data?.message)
        dispatch(userSlice.actions.clearAllErrors())

    }
}

export const logout = () => async(dispatch) => {
    try {
        const response = await axios.get("http://localhost:7000/api/user/logout", 
            { withCredentials: true} 
        )
        dispatch(userSlice.actions.logoutSuccess())
        toast.success(response.data.message)
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed())
        toast.error(error.response.data.message)
        dispatch(userSlice.actions.clearAllErrors())
    }
}

export const fetchUser = () => async(dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest()) 
    try {
        const response = await axios.get(

            "http://localhost:5000/api/users/me", 
            { 
                withCredentials: true
            } 
        )

        dispatch(userSlice.actions.fetchUserSuccess(response.data.user))
        dispatch(userSlice.actions.clearAllErrors())

    } catch (error) {

        dispatch(userSlice.actions.fetchUserFailed())
        dispatch(userSlice.actions.clearAllErrors())
        console.log(error)
    }
}

export default userSlice.reducer