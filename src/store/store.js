import { configureStore } from "@reduxjs/toolkit";
import { authSlice, activeChatSlice } from "./slices";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        activeChat: activeChatSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
}) ;

export default store