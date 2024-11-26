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
    }
})