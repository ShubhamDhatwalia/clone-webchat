import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';



export const addChatbot = createAsyncThunk('addChatbot', async (chatbot, { rejectWithValue }) => {
    try {
        const res = await axios.post('/addChatbot', chatbot);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }

});
