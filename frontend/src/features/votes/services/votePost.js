import axios from "axios";
axios.defaults.withCredentials = true;
const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";
export default async function votePost(vote) {
  try {
    let { data: voted } = await axios.post(`${DOMAIN}/api/posts/vote`, vote, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return voted;
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    throw {
      message: errorMsg || "An unknown error has happened!",
      status: status || e.code,
    };
  }
}
