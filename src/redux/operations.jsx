import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://65493b66dd8ebcd4ab245f9e.mockapi.io/api';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, phone });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const delContact = createAsyncThunk('contacts/delContact', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
