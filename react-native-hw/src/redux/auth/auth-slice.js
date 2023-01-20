import { createSlice } from "@reduxjs/toolkit";
import {
  registration,
  logIn,
  logOutUser,
  userAuth,
  updateProfileUser,
} from "./auth-operations";

const initialState = {
  user: {
    uid: "",
    userName: "",
    email: "",
    photoUrl: null,
  },
  isLogIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUpdate: (state, { payload }) => {
      state.user = {
        ...payload,
      };
      state.isLoading = false;
      state.isLogIn = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.user = {
        ...payload,
      };
      state.isLoading = false;
      state.isLogIn = true;
      state.error = null;
    });
    builder.addCase(registration.rejected, (state, { payload }) => {
      state.isLogIn = false;
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.user = {
        ...payload,
      };
      state.isLoading = false;
      state.isLogIn = true;
      state.error = null;
    });
    builder.addCase(logIn.rejected, (state, { payload }) => {
      state.isLogIn = false;
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(logOutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user = { ...initialState.user };
      state.isLoading = false;
      state.isLogIn = false;
      state.error = null;
    });
    builder.addCase(logOutUser.rejected, (state, { payload }) => {
      state.isLogIn = true;
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(userAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userAuth.fulfilled, (state, { payload }) => {
      state.user = {
        ...payload,
      };
      state.isLoading = false;
      state.isLogIn = true;
      state.error = null;
    });
    builder.addCase(userAuth.rejected, (state, { payload }) => {
      state.isLogIn = false;
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(updateProfileUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfileUser.fulfilled, (state, { payload }) => {
      state.user = {
        ...payload,
      };
      state.isLoading = false;
      state.isLogIn = true;
      state.error = null;
    });
    builder.addCase(updateProfileUser.rejected, (state, { payload }) => {
      state.isLogIn = true;
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { authUpdate } = authSlice.actions;
export default authSlice.reducer;
