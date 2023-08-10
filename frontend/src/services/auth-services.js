import axios from "axios";
axios.defaults.withCredentials = true;
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
    console.log(e.response);
    let errorMsg = e.response?.data?.error;
    let status = e.response?.status;
    return { error: { error: errorMsg, status } };
  }
};
export { getAuthStatus };
