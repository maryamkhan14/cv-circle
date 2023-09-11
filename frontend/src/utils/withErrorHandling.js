export default async (fn) => {
  try {
    return await fn();
  } catch (e) {
    let { data, status } = e.response || {};
    let errorMsg = data?.error;
    throw {
      message: errorMsg || "An unknown error has happened!",
      status: status || e.code,
    };
  }
};
