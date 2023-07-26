import { vi } from "vitest";
import realTestDbClient from "./db-client";
import {
  makeFakeSingleRawPostRecord,
  makeFakeListOfRawPostRecords,
} from "./mock-db-client-responses";
let updateSpy = vi.fn(() => {
  return {
    eq: vi.fn(() => {
      return { data: null, error: null };
    }),
  };
});
let insertSpy = vi.fn(() => {
  return {
    select: vi.fn(() => {
      return {
        data: makeFakeSingleRawPostRecord(),
        error: null,
      };
    }),
  };
});
let selectSpy = vi.fn(() => {
  return {
    order: vi.fn(() => {
      return { data: makeFakeListOfRawPostRecords(), error: null };
    }),
    eq: vi.fn(() => {
      return { data: makeFakeSingleRawPostRecord(), error: null };
    }),
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
      update: updateSpy,
    };
  }),
};
export default mockTestDbClient;
