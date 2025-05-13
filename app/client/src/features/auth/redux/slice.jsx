import { createSlice } from "@reduxjs/toolkit";
import { editUsername } from "@features/settings/api/edit-username";
import { editPfp } from "@features/settings/api/edit-pfp";

const initialState = {
  isAuthorizing: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.isAuthorizing = false;
      state.user = action.payload;
    }
  },
  extraReducers: builder =>{
    builder
    .addCase(editUsername.fulfilled, (state, action) => { 
      if (state.user) {
        state.user.username = action.payload.username;
      }
    })
    .addCase(editPfp.fulfilled, (state, action) => {
      if (state.user) {
        state.user.pfp = action.payload.pfp;
      }
    });
  }
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
