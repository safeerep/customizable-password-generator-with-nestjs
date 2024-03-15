import { createSlice } from "@reduxjs/toolkit";
import {
    login
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
    },

})

export default slice.reducer;