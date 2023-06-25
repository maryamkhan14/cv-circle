import { vi } from "vitest";
import realTestDbClient from "./db";

let insertSpy = vi.fn(() => {
  return {
    select: vi.fn(() => {}),
  };
});
let uploadBucketSpy = vi.fn(async () => {});

const mockTestDbClient = {
  ...realTestDbClient,
  insertSpy: insertSpy,
  uploadBucketSpy: uploadBucketSpy,
  storage: {
    from: vi.fn(() => {
      return { upload: uploadBucketSpy };
    }),
  },
  from: vi.fn(() => {
    return {
      insert: insertSpy,
    };
  }),
};
export default mockTestDbClient;
