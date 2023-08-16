import axios from "axios";

const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const getAuthStatus = async () => {
  try {
    let { data: authStatus } = await axios.get(`${DOMAIN}/api/auth/success`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    return authStatus;
  } catch (e) {
    let errorMsg = e.response?.data?.error;
    let status = e.response?.status;
    return { error: { message: errorMsg, status } };
  }
};
const postLogout = async () => {
  try {
    let { data: authStatus } = await axios.post(
      `${DOMAIN}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return authStatus;
  } catch (e) {
    let errorMsg = e.response?.data?.error;
    let status = e.response?.status;
    return { error: { message: errorMsg, status } };
  }
};
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
const AUTH_URL_GITHUB = `${DOMAIN}/api/auth/github`;
const AUTH_URL_GOOGLE = `${DOMAIN}/api/auth/google`;
export {
  getAuthStatus,
  postLogout,
  updateUser,
  AUTH_URL_GITHUB,
  AUTH_URL_GOOGLE,
};
