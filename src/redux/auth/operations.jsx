import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk('auth/register', async (credentials, herokuApi) => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    // After successful registration, add the token to the HTTP header
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    toast.error(error.message);
    return herokuApi.rejectWithValue(error.message);
  }
});

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk('auth/login', async (credentials, herokuApi) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    // After successful login, add the token to the HTTP header
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    toast.error(error.message);
    return herokuApi.rejectWithValue(error.message);
  }
});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, herokuApi) => {
  try {
    await axios.post('/users/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    toast.error(error.message);
    return herokuApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, herokuApi) => {
  // Reading the token from the state via getState()
  const state = herokuApi.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    // If there is no token, exit without performing any requests
    return herokuApi.rejectWithValue('Unable to fetch user');
  }

  try {
    // If there is a token, add it to the HTTP header and perform the request
    setAuthHeader(persistedToken);
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    toast.error(error.message);
    return herokuApi.rejectWithValue(error.message);
  }
});
