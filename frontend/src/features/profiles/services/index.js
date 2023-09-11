import axios from "axios";
import withErrorHandling from "../../../utils/withErrorHandling";

const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

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
