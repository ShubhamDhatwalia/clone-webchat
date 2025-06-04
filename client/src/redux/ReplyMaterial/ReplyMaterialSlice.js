// features/textReply/textReplySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addReplyMaterial, updateReplyMaterial, deleteReplyMaterial, fetchTextReply } from './ReplyMaterialThunk.js';

const initialState = {
    replyMaterial: [],
    loading: false,
    error: null,
};

const replyMaterialSlice = createSlice({
    name: 'replyMaterial',
    initialState,
    reducers: {
        setReplyMaterial: (state, action) => {
            state.replyMaterial = action.payload;
        },
    },
    extraReducers: (builder) => {

        //fetch text reply


        builder.addCase(fetchTextReply.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTextReply.fulfilled, (state, action) =>{
            state.loading = false;
            state.replyMaterial = action.payload;   
        });
        builder.addCase(fetchTextReply.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // Add
        builder.addCase(addReplyMaterial.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addReplyMaterial.fulfilled, (state, action) => {
            state.loading = false;
            state.replyMaterial.push(action.payload);
        });
        builder.addCase(addReplyMaterial.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update
        builder.addCase(updateReplyMaterial.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateReplyMaterial.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.replyMaterial.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.replyMaterial[index] = action.payload;
            }
        });
        builder.addCase(updateReplyMaterial.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete
        builder.addCase(deleteReplyMaterial.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteReplyMaterial.fulfilled, (state, action) => {
            state.loading = false;
            state.replyMaterial = state.replyMaterial.filter((item) => item._id !== action.payload);
        });
        builder.addCase(deleteReplyMaterial.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setReplyMaterial } = replyMaterialSlice.actions;
export default replyMaterialSlice.reducer;
