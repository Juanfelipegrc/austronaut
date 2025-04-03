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
        memory: '',
    },
    reducers: {
        setActiveChat: (state, {payload}) =>{
            state.title = payload.title;
            state.messages = payload.messages;
            state.id = payload.id;
            state.memory = payload.memory;
        },

        setLoadingResponse: (state, {payload}) => {
            state.loadingResponse = payload;
        },

        setMessages: (state, {payload}) => {
            state.messages = payload;
        },

        setMemory: (state, {payload}) => {
            state.memory = payload;
        },

        cleanActiveChat: (state) => {
            state.title = '';
            state.messages = [];
            state.id = '';
            state.loadingResponse = {
                state: false,
                idUser: '',
                idAustronaut: ''
            };
            state.memory = '';
        },
    }
});


export const { setActiveChat, setLoadingResponse, setMessages, cleanActiveChat, setMemory } = activeChatSlice.actions;