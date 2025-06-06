import { createSlice } from '@reduxjs/toolkit';

import { addChatbot } from './chatbotsThunk';



const initialState = {
    chatbots: [],
    loading: false,
    error: null,
};


const chatbotsSlice = createSlice({
    name: 'chatbots',
    initialState,
    reducers: {
        setChatbots: (state, action) => {
            state.chatbots = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addChatbot.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addChatbot.fulfilled, (state, action) => {
            state.loading = false;
            state.chatbots.push(action.payload);
        });
        builder.addCase(addChatbot.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});




export const { setChatbots } = chatbotsSlice.actions;


export default chatbotsSlice.reducer;