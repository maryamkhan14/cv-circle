import axios from "axios";

const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const updateUser = async (user) => {
  try {
    let { data } = await axios.patch(`${DOMAIN}/api/auth/user`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.updated;
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
export { updateUser };
