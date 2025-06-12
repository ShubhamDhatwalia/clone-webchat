
import { createSlice } from '@reduxjs/toolkit';
import { fetchChat, fetchAllChats } from './chatThunk.js';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        allChats: [],
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
            .addCase(fetchAllChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllChats.fulfilled, (state, action) => {
                state.loading = false;
                state.allChats = action.payload;
            })
            .addCase(fetchAllChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch all chats';
            });




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
