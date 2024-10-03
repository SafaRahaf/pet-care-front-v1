import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import envConfig from "../../config/envConfig";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await axios.get(`${envConfig.baseApi}/comments/${postId}`);
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, content }: { postId: string; content: string }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${envConfig.baseApi}/comments`,
      {
        post: postId,
        content,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.data);
      });
  },
});

export default commentSlice.reducer;
