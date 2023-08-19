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
    return { error: errorMsg, status };
  }
}
