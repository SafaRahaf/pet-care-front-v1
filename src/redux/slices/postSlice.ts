import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import envConfig from "../../config/envConfig";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${envConfig.baseApi}/posts`);
  return response.data;
});

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const upvotePost = createAsyncThunk(
  "posts/upvotePost",
  async (postId) => {
    const response = await axios.post(
      `${envConfig.baseApi}/posts/upvote/${postId}`,
      {},
      {
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    return response.data;
  }
);

export const downvotePost = createAsyncThunk(
  "posts/downvotePost",
  async (postId) => {
    const response = await axios.post(
      `${envConfig.baseApi}/posts/downvote/${postId}`,
      {},
      {
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "posts/followUser",
  async (userId) => {
    //@ts-ignore
    if (!userId) throw new Error("User ID is required");
    const response = await axios.post(
      `${envConfig.baseApi}/users/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    return { id: userId, message: response.data.message };
  }
);

export const unfollowUser = createAsyncThunk(
  "posts/unfollowUser",
  async (userId) => {
    //@ts-ignore
    if (!userId) throw new Error("User ID is required");
    const response = await axios.post(
      `${envConfig.baseApi}/users/unfollow/${userId}`,
      {},
      {
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    return { id: userId, message: response.data.message };
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    followedUsers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        //@ts-ignore
        const post = state.posts.data.find((post) => post._id === postId);
        if (post) {
          post.upvotes = action.payload.upvotes;
          post.downvotes = action.payload.downvotes;
        }
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        //@ts-ignore
        const post = state.posts.data.find((post) => post._id === postId);
        if (post) {
          post.upvotes = action.payload.upvotes;
          post.downvotes = action.payload.downvotes;
        }
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const followedUserId = action.payload.id;
        if (!state.followedUsers.includes(followedUserId)) {
          state.followedUsers.push(followedUserId);
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const unfollowedUserId = action.payload.id;
        state.followedUsers = state.followedUsers.filter(
          (id) => id !== unfollowedUserId
        );
      });
  },
});
export default postSlice.reducer;
