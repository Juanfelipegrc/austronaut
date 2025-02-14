import { configureStore } from "@reduxjs/toolkit";
import { authSlice, activeChatSlice } from "./slices";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        activeChat: activeChatSlice.reducer,
    }
}) ;

export default store