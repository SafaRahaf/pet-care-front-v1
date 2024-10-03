import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import envConfig from "../../config/envConfig";

interface AuthState {
  user: {
    _id: string;
    email: string;
    name: string;
    token: string;
    role: string;
    posts: Array<any>;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: (() => {
    if (typeof window !== "undefined" && localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user")!);
    }
    return null;
  })(),
  isLoading: false,
  isAuthenticated: !!(
    typeof window !== "undefined" && localStorage.getItem("token")
  ),
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    const response = await axios.post(
      `${envConfig.baseApi}/auth/login`,
      userData
    );
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: { email: string; password: string; username: string }) => {
    const response = await axios.post(
      `${envConfig.baseApi}/auth/register`,
      userData
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = {
          ...action.payload.data,
          token: action.payload.token,
        };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = {
          ...action.payload.data,
          token: action.payload.token,
        };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
