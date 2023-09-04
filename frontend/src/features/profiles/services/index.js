import axios from "axios";

const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const withErrorHandling = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    console.log(e);
    let { data, status } = e.response || {};
    let errorMsg = data?.error;
    throw {
      message: errorMsg || "An unknown error has happened!",
      status: status || e.code,
    };
  }
};
const getUserProfile = async (userId) => {
  return await withErrorHandling(async () => {
    let { data } = await axios.get(`${DOMAIN}/api/users/identity/${userId}`, {
      withCredentials: true,
    });
    return data?.user;
  });
};
const updateUser = async (user) => {
  return await withErrorHandling(async () => {
    let { data } = await axios.patch(`${DOMAIN}/api/users/identity`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.updated;
  });
};
const deleteUser = async () => {
  return await withErrorHandling(async () => {
    let { data } = await axios.delete(`${DOMAIN}/api/users/identity`);
    return data?.deleted;
  });
};
export { updateUser, deleteUser, getUserProfile };
