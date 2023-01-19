import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registrationDB,
  logInDB,
  logOutDB,
  updateProfileDb,
  userAuthDb,
} from "../../shared/requestFirebase/auth/auth";

export const logIn = createAsyncThunk(
  "auth/LogIn",
  async (data, { rejectWithValue }) => {
    try {
      const result = await logInDB(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
export const registration = createAsyncThunk(
  "auth/Registration",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await registrationDB(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/LogOut",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logOutDB();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "auth/UpdateProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await updateProfileDb(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const userAuth = createAsyncThunk(
  "auth/UserAuth",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await userAuthDb(data);

      if (!result) {
        return rejectWithValue("User not defined");
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
