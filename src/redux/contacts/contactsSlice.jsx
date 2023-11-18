import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, delContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = [action.payload, ...state.contacts];
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(delContact.pending, handlePending)
      .addCase(delContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
      })
      .addCase(delContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
