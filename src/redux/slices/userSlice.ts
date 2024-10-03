import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userService";
import axios from "axios";
import envConfig from "../../config/envConfig";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const users = await getAllUsers();
  return users.data;
});

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { getState }) => {
    //@ts-ignore
    const { auth } = getState();
    const token = auth?.token;

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.put(
      `${envConfig.baseApi}/users/me`,
      formData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  }
);

export const changeUserRole = createAsyncThunk(
  "users/changeRole",
  async ({ userId, newRole }: { userId: string; newRole: string }) => {
    await updateUserRole(userId, newRole);
    return { userId, newRole };
  }
);

export const removeUser = createAsyncThunk(
  "users/remove",
  async (userId: string) => {
    await deleteUser(userId);
    return userId;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const { userId, newRole } = action.payload;
        const userIndex = state.users.findIndex((user) => user._id === userId);
        if (userIndex >= 0) {
          state.users[userIndex].role = newRole;
        }
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.filter((user) => user._id !== userId);
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        //@ts-ignore
        state.profile = action.payload;
      });
  },
});

export default userSlice.reducer;
