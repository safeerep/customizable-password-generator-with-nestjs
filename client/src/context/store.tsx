import { configureStore } from "@reduxjs/toolkit"
import userReducers from "./reducers/slice"

const store = configureStore({
    reducer: {
        user: userReducers
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType< typeof store.getState>
export default store;
