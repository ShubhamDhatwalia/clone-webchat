import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


export const addReplyMaterial = createAsyncThunk('replyMaterial/add', async (replyMaterial, { rejectWithValue }) => {
    try {
        const res = await axios.post('/addReplyMaterial', replyMaterial);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})

export const updateReplyMaterial = createAsyncThunk('replyMaterial/update', async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        console.log(updatedData)
        const res = await axios.put(`/updateReplyMaterial/${id}`, updatedData);
        toast.success('Reply material updated');
        return res.data;
    } catch (err) {
        toast.error('Failed to update ')
        return rejectWithValue(err.response?.data || err.message);
    }
});
export const deleteReplyMaterial = createAsyncThunk('replyMaterial/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`/deleteReplyMaterial/${id}`);

        return id;
    } catch (err) {
        toast.error('Failed to delete')
        return rejectWithValue(err.response?.data || err.message);
    }
});


export const fetchTextReply = createAsyncThunk('replyMaterial/fetchTextReply', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get('/replyMaterial/textReply');
        return res.data;
    } catch (err) {
        toast.error('Failed to get')
        return rejectWithValue(err.response?.data || err.message);
    }
});