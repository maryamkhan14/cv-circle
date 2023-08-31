import { vi } from "vitest";

let xAddSpy = vi.fn(async (data) => {
  return await "1526919030474-55";
});
let hSetSpy = vi.fn(async (data) => {
  return await 1;
});
let hExists = vi.fn(async (hash, field) => {
  return await 1;
});
let hDelSpy = vi.fn(async (hash, field) => {
  return await 1;
});
const mockCacheClient = {
  xAdd: xAddSpy,
  hSet: hSetSpy,
  hExists: hExists,
  hDel: hDelSpy,
};
export default mockCacheClient;
