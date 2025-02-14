import { createSlice } from '@reduxjs/toolkit';


export const activeChatSlice = createSlice({
    name: 'activeChatSlice',
    initialState: {
        title: '',
        messages: [],
        deepThink: false,
        search: false
    },
    reducers: {
        setActiveChat: (state, {payload}) =>{
            state.title = payload.title;
            state.messages = payload.messages;
            state.deepThink = payload.deepThink;
            state.search = payload.search;
        },
    }
});


export const { setActiveChat } = activeChatSlice.actions;