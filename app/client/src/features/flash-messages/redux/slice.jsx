import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const flashMessageSlice = createSlice({
  name: "flashMessages",
  initialState,
  reducers: {
    addFlashMessage(state, action) {
      state.messages.push(action.payload);
    },
    removeFlashMessage(state, action) {
      state.messages.splice(action.payload, 1);
    },
    clearFlashMessages(state) {
      state.messages = [];
    },
  },
});

export const {
  addFlashMessage,
  removeFlashMessage,
  clearFlashMessages,
} = flashMessageSlice.actions;
export default flashMessageSlice.reducer;
