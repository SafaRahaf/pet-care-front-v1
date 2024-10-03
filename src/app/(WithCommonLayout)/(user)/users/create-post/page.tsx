"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../../../redux/slices/postSlice";
import axios from "axios";
import envConfig from "../../../../../config/envConfig";

const CreatePostPage = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { posts, loading, error } = useSelector((state) => state.posts);
  //@ts-ignore
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "Tip",
    author: user?._id,
  });

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${envConfig.baseApi}/posts/create`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setFormData({
        title: "",
        content: "",
        imageUrl: "",
        category: "Tip",
        author: user?._id,
      });
      //@ts-ignore
      dispatch(fetchPosts());
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold my-4">Add a New Post</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block pb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block pb-2" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block pb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block pb-1" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          >
            <option value="Tip">Tip</option>
            <option value="Story">Story</option>
          </select>
        </div>
        <button type="submit" className="bg-gray-800 text-white rounded p-2">
          Create Post
        </button>
      </form>
      <h1 className="text-2xl font-bold my-4">All Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full border ">
        <thead>
          <tr>
            <th className="border  px-4 py-2">Title</th>
            <th className="border  px-4 py-2">Content</th>
            <th className="border  px-4 py-2">Category</th>
            <th className="border  px-4 py-2">Image</th>
            <th className="border  px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.data?.map((post) => (
            <tr key={post._id}>
              <td className="border  px-4 py-2">{post.title}</td>
              <td className="border  px-4 py-2">{post.content}</td>
              <td className="border  px-4 py-2">{post.category}</td>
              <td className="border  px-4 py-2">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-16 h-16"
                />
              </td>
              <td className="border p-1">
                <button
                  // onClick={() => setSelectedPostId(post._id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  // onClick={() =>  Add delete functionality here
                  className="text-red-500 hover:underline ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatePostPage;
