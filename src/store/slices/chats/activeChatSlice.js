import { createSlice } from '@reduxjs/toolkit';


export const activeChatSlice = createSlice({
    name: 'activeChatSlice',
    initialState: {
        title: '',
        messages: [],
        id: '',
        loadingResponse: {
            state: false,
            idUser: '',
            idAustronaut: '',
        },
    },
    reducers: {
        setActiveChat: (state, {payload}) =>{
            state.title = payload.title;
            state.messages = payload.messages;
            state.id = payload.id;
        },

        setLoadingResponse: (state, {payload}) => {
            state.loadingResponse = payload;
        },

        setMessages: (state, {payload}) => {
            state.messages = payload
        }
    }
});


export const { setActiveChat, setLoadingResponse, setMessages } = activeChatSlice.actions;