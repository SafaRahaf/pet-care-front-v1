"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  updateUserProfile,
} from "../../../../redux/slices/userSlice";

export default function UserDashboard() {
  const dispatch = useDispatch();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.user);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user?._id) {
      //@ts-ignore
      dispatch(fetchUsers(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      //@ts-ignore
      dispatch(updateUserProfile(formData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="">
      <div className="p-3">
        <header className="flex mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg shadow-lg border">
            <h2 className="font-bold text-lg">My Posts</h2>
            <p>Manage your posts and create new content.</p>
          </div>
          <div className="p-4 rounded-lg shadow-lg border">
            <h2 className="font-bold text-lg">Messages</h2>
            <p>Check your messages and notifications.</p>
          </div>
          <div className="p-4 rounded-lg shadow-lg border">
            <h2 className="font-bold text-lg">Activity Log</h2>
            <p>View your recent activities on the platform.</p>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h2 className="font-semibold text-xl mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
