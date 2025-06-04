import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


export const addKeyword = createAsyncThunk('addKeyword', async (keyword, { rejectWithValue }) => {
    try {
        const res = await axios.post('/addKeyword', keyword)
        return res.data;
    } catch (error) {
        return rejectWithValue(err.response?.data || err.message);
    }

});
