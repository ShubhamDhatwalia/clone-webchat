import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Your backend base URL
const API_BASE = 'https://clone-webchat.onrender.com';

//
export const createTemplate = createAsyncThunk(
  'templates/createTemplate',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/templates`, payload);
      toast.success('Template created successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to create template.');
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const editTemplate = createAsyncThunk(
  'templates/editTemplate',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/templates/${id}`, payload);
      toast.success('Template updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update template.');
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchTemplates = createAsyncThunk(
  'templates/fetchTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/templates`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch templates.');
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  'templates/deleteTemplate',
  async (id, { rejectWithValue }) => {
    try {

      await axios.delete(`${API_BASE}/templates/${id}`);
      toast.success('Template deleted successfully!');
      return id;
    } catch (error) {
      toast.error('Failed to delete template.');
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
