import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
}) ;

export default store