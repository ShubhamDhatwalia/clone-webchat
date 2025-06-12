import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchChat = createAsyncThunk('chat/fetchChat', async ({ phone }, { rejectWithValue }) => {

    console.log(phone);
    try {
        const response = await axios.get(`/chat/${phone}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }

})

export const fetchAllChats = createAsyncThunk('chat/fetchAllChats', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/chat');
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
})