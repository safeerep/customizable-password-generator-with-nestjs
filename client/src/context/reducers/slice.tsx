import { createSlice } from "@reduxjs/toolkit";
import {
    authCheck,
    login, 
    register,
    generatePassword,
    getPasswords,
    removePassword,
    storePassword
} from "../actions/actions";
import { userState } from "../../types";

const INITIAL_STATE: userState = {
    loading: false,
    data: {},
    error: "",
}

const slice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // login
            .addCase( login.pending, (state) => {
                state.loading = true;
            })
            .addCase( login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // register
            .addCase( register.pending, (state) => {
                state.loading = true;
            })
            .addCase( register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // auth
            .addCase( authCheck.pending, (state) => {
                state.loading = true;
            })
            .addCase( authCheck.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( authCheck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // generating new password
            .addCase( generatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase( generatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( generatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // fetching all the stored passwords of current user
            .addCase( getPasswords.pending, (state) => {
                state.loading = true;
            })
            .addCase( getPasswords.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( getPasswords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // to store a password.
            .addCase( storePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase( storePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( storePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // to remove a password from stored.
            .addCase( removePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase( removePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.data = action.payload!;
            })
            .addCase( removePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    },

})

export default slice.reducer;