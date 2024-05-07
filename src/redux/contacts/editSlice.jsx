import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
  name: 'edit',
  initialState: { selectedContact: {}, isEdit: false },
  reducers: {
    setSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    clearSelectedContact(state) {
      state.selectedContact = {};
    },
    updateContactSuccess(state, action) {
      state.selectedContact = action.payload;
    },
  },
});

export const editReducer = editSlice.reducer;
export const { setSelectedContact, setIsEdit, clearSelectedContact, updateContactSuccess } =
  editSlice.actions;
