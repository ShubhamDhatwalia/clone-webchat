import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';



export const createTemplate = createAsyncThunk(
  'templates/createTemplate',
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post(`/createTemplate`, payload);
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
      const response = await axios.post(`/template/${id}`, payload);
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
      const response = await axios.get('/templates');
      return response.data;
      console.log(response.data);
    } catch (error) {
      toast.error('Failed to fetch templates.');
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  'templates/deleteTemplate',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      // Send id and name as query parameters
      const response = await axios.delete(`/deleteTemplate?id=${id}&name=${encodeURIComponent(name)}`);
      toast.success('Template deleted successfully!');
      return id;
    } catch (error) {
      toast.error('Failed to delete template.');
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

