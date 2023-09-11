import axios from "axios";
import withErrorHandling from "../../../utils/withErrorHandling";
const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const getCurrentUser = async () => {
  return await withErrorHandling(async () => {
    let { data } = await axios.get(`${DOMAIN}/api/users/auth/success`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    return data.user;
  });
};
const postLogout = async () => {
  return await withErrorHandling(async () => {
    let { data: authStatus } = await axios.post(
      `${DOMAIN}/api/users/auth/logout`,
      {},
      { withCredentials: true }
    );
    return authStatus;
  });
};

const AUTH_URL_GITHUB = `${DOMAIN}/api/users/auth/github`;
const AUTH_URL_GOOGLE = `${DOMAIN}/api/users/auth/google`;
export { getCurrentUser, postLogout, AUTH_URL_GITHUB, AUTH_URL_GOOGLE };
