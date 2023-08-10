import axios from "axios";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof error.response === "undefined") {
      window.location = `http://localhost:5173/network-error`;
    }
    return Promise.reject(error);
  }
);
const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const getAuthStatus = async () => {
  try {
    let { data: authStatus } = await axios.get(`${DOMAIN}/api/auth/success`, {
      withCredentials: true,
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

const AUTH_URL_GITHUB = `${DOMAIN}/api/auth/github`;
const AUTH_URL_GOOGLE = `${DOMAIN}/api/auth/google`;
export { getAuthStatus, postLogout, AUTH_URL_GITHUB, AUTH_URL_GOOGLE };
