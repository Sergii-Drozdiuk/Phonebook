import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContacts = createAsyncThunk('contacts/', async (_, herokuApi) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    return herokuApi.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (data, herokuApi) => {
  try {
    const response = await axios.post('/contacts', data);
    return response.data;
  } catch (error) {
    return herokuApi.rejectWithValue(error.message);
  }
});

export const delContact = createAsyncThunk('contacts/deleteContact', async (id, herokuApi) => {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (error) {
    return herokuApi.rejectWithValue(error.message);
  }
});
