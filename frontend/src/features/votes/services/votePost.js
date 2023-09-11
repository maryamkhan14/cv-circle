import axios from "axios";
axios.defaults.withCredentials = true;
import withErrorHandling from "../../../utils/withErrorHandling";
const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";
export default async function votePost(vote) {
  return await withErrorHandling(async () => {
    let { data: voted } = await axios.post(`${DOMAIN}/api/posts/vote`, vote, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return voted;
  });
}
