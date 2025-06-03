import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';







export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get('/contacts');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const addContact = createAsyncThunk('contacts/add', async (contact, { rejectWithValue }) => {
    try {
        const res = await axios.post('/addContacts', contact);

        return res.data;
    } catch (err) {

        return rejectWithValue(err.response?.data || err.message);
    }
});

export const updateContact = createAsyncThunk('contacts/update', async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        console.log(id);
        console.log(updatedData);
        const res = await axios.put(`/updateContact/${id}`, updatedData);
        toast.success('Contact updated');
        return res.data;
    } catch (err) {
        toast.error('Failed to update');
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const deleteContact = createAsyncThunk('contacts/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`/deleteContact/${id}`);

        return id;
    } catch (err) {

        return rejectWithValue(err.response?.data || err.message);
    }
});

// TAGS
export const addTags = createAsyncThunk('contacts/tags/add', async ({ id, tags }, { rejectWithValue }) => {
    try {
        console.log(tags)
        const res = await axios.patch(`/contacts/${id}/addTags`, { tags });
        toast.success('Tags updated');
        return res.data;
    } catch (err) {
        toast.error('Failed to update tags');
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const removeTags = createAsyncThunk('contacts/tags/remove', async ({ id, tag }, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`/contacts/${id}/tags/remove`, { tag });
        toast.success('Tag removed');
        return res.data;
    } catch (err) {
        toast.error('Failed to remove tag');
        return rejectWithValue(err.response?.data || err.message);
    }
});

// NOTES
export const addNotes = createAsyncThunk('contacts/notes/add', async ({ id, note }, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`/contacts/${id}/notes`, { note });
        toast.success('Note added');
        return res.data;
    } catch (err) {
        toast.error('Failed to add note');
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const removeNotes = createAsyncThunk('contacts/notes/remove', async ({ id, time }, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`/contacts/${id}/notes/remove`, { time });
        toast.success('Note removed');
        return res.data;
    } catch (err) {
        toast.error('Failed to remove note');
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const updateNote = createAsyncThunk('contacts/notes/update', async ({ id, updatedNote }, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`/contacts/${id}/notes/update`, { updatedNote });
        toast.success('Note updated');
        return res.data;
    } catch (err) {
        toast.error('Failed to update note');
        return rejectWithValue(err.response?.data || err.message);
    }
});
