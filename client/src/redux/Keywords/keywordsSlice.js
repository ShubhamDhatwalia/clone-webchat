import { createSlice } from '@reduxjs/toolkit';

import { addKeyword, fetchKeywords, deleteKeywords } from './keywordThunk.js';

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


        // delete keywords
        builder.addCase(deleteKeywords.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteKeywords.fulfilled, (state, action) => {
            state.loading = false;
            state.keywords = state.keywords.filter((keyword) => keyword._id !== action.payload._id);
        });
        builder.addCase(deleteKeywords.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;

        });



        //fetch keywords
        builder.addCase(fetchKeywords.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchKeywords.fulfilled, (state, action) => {
            state.loading = false;
            state.keywords = action.payload;
        });
        builder.addCase(fetchKeywords.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });



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
