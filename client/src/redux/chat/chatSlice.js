
import { createSlice } from '@reduxjs/toolkit';
import { fetchChat } from './chatThunk.js';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        loading: false,
        error: null
    },
    reducers: {
        clearChats: (state) => {
            state.chats = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch chat';
            });
    }
});

export const { clearChats } = chatSlice.actions;
export default chatSlice.reducer;
