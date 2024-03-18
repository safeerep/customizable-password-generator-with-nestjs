import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonRequest } from "../common/api";
import { config } from "../common/configurations";

export const authCheck = createAsyncThunk('/authcheck', 
    async () => {
        return commonRequest(
            "get",
            "/",
            {},
            config
        )
    }
)

export const login = createAsyncThunk('/login', 
    async ( userCredentials: object) => {
        return commonRequest(
            "post",
            "/login",
            userCredentials,
            config
        )
    }
)

export const register = createAsyncThunk('/register', 
    async ( userCredentials: object) => {
        return commonRequest(
            "post",
            "/register",
            userCredentials,
            config
        )
    }
)

export const logout = createAsyncThunk('/logout', 
    async () => {
        return commonRequest(
            "get",
            "/logout",
            {},
            config
        )
    }
)

// generate password
export const generatePassword = createAsyncThunk('/generate', 
    async ( requirements: object) => {
        return commonRequest(
            "post",
            "/generate-password",
            requirements,
            config
        )
    }
)

// to store password
export const storePassword = createAsyncThunk('/store', 
    async ( passwordDetails: object) => {
        return commonRequest(
            "post",
            "/store-password",
            passwordDetails,
            config
        )
    }
)

// get stored passwords
export const getPasswords = createAsyncThunk('/retrieve', 
    async () => {
        return commonRequest(
            "get",
            "/retrieve-passwords",
            {},
            config
        )
    }
)

// remove saved password
export const removePassword = createAsyncThunk('/remove', 
    async ( passwordId: string) => {
        return commonRequest(
            "get",
            "/remove-password",
            {passwordId},
            config
        )
    }
)