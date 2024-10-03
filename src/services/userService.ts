import axios from "axios";
import envConfig from "../config/envConfig";

const API_URL = `${envConfig.baseApi}/users/`;

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

export const updateUserRole = async (userId, newRole) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}role/${userId}`,
    { role: newRole },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}${userId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};
