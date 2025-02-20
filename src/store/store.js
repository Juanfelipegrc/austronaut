import { configureStore } from "@reduxjs/toolkit";
import { authSlice, activeChatSlice, authTransitionSlice } from "./slices";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        authTransition: authTransitionSlice.reducer,
        activeChat: activeChatSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
}) ;

export default store