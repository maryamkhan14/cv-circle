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
    return authStatus.user;
  } catch (e) {
    let errorMsg = e.response?.data?.error;
    let status = e.response?.status;
    throw {
      message: errorMsg || "An unknown error has happened!",
      status: status || e.code,
    };
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
    throw {
      message: errorMsg || "An unknown error has happened!",
      status: status || e.code,
    };
  }
};

const AUTH_URL_GITHUB = `${DOMAIN}/api/auth/github`;
const AUTH_URL_GOOGLE = `${DOMAIN}/api/auth/google`;
export { getAuthStatus, postLogout, AUTH_URL_GITHUB, AUTH_URL_GOOGLE };
