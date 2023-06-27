import { vi } from "vitest";
import realTestDbClient from "./db-client";
import {
  makeFakeSinglePostRecord,
  makeFakeListOfPostRecords,
} from "../mock-db-client-responses";
let insertSpy = vi.fn(() => {
  return {
    select: vi.fn(() => makeFakeSinglePostRecord()),
  };
});
let selectSpy = vi.fn(() => {
  return {
    order: vi.fn(() => makeFakeListOfPostRecords()),
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
      select: selectSpy,
      insert: insertSpy,
    };
  }),
};
export default mockTestDbClient;
