import axios from "axios";

const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const updateUser = async (user) => {
  try {
    let updatedUser = await axios.patch(`${DOMAIN}/api/auth/user`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(updatedUser);
    return updatedUser;
  } catch (e) {
    let errorMsg = e.response?.data?.error;
    let status = e.response?.status;
    return { error: { message: errorMsg, status } };
  }
};
export { updateUser };
