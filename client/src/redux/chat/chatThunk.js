import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchChat = createAsyncThunk('chat/fetchChat', async ({ phone }, { rejectWithValue }) => {

    try {
        const response = await axios.get(`/chat/${phone}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }

})