import { createSlice } from '@reduxjs/toolkit';

import { addKeyword } from './keywordThunk.js';

const initialState = {
    keywords: [],
    loading: false,
    error: null,
};

const keywordSlice = createSlice({
    name: 'keywords',
    initialState,
    reducers: {
        setkeyword: (state, action) => {
            state.keywords = action.payload;
        },
    },
    extraReducers: (builder) => {


        // Add Keyword
        builder.addCase(addKeyword.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addKeyword.fulfilled, (state, action) => {
            state.loading = false;
            state.keywords.push(action.payload);
        });
        builder.addCase(addKeyword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
});



export const { setkeyword } = keywordSlice.actions;

export default keywordSlice.reducer;
