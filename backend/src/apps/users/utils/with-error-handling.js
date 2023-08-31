/* istanbul ignore file */
export default function withErrorHandling(...functions) {
  const fnError = executeFunctions(functions);
  return (errMessage) => {
    if (fnError) {
      throw new Error(errMessage);
    }
  };
}
function executeFunctions(functions) {
  for (let fn of functions) {
    fn((err) => {
      if (err) {
        return true;
      }
    });
  }
}
