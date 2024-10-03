"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  changeUserRole,
  removeUser,
} from "../../../../../redux/slices/userSlice";
import { RootState } from "../../../../../redux/store";

const page = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    //@ts-ignore
    dispatch(changeUserRole({ userId, newRole }));
  };

  const handleDeleteUser = (userId) => {
    //@ts-ignore
    dispatch(removeUser(userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold">Manage Users</h3>
      <div className="mt-4 p-6 ">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500"
                    onClick={() => handleRoleChange(user._id, user.role)}
                  >
                    Change Role
                  </button>
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
