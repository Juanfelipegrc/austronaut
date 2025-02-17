import { createSlice } from '@reduxjs/toolkit';


export const activeChatSlice = createSlice({
    name: 'activeChatSlice',
    initialState: {
        title: '',
        messages: [],
        loadingResponse: false,
    },
    reducers: {
        setActiveChat: (state, {payload}) =>{
            state.title = payload.title;
            state.messages = payload.messages;
        },
        setLoadingResponse: (state, {payload}) => {
            state.loadingResponse = payload;
        }
    }
});


export const { setActiveChat, setLoadingResponse } = activeChatSlice.actions;