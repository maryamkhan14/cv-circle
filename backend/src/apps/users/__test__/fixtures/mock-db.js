import { vi } from "vitest";
import { makeFakeRawUser } from "./user";

let upsertSpy = vi.fn((user) => {
  return {
    select: vi.fn(() => {
      return { data: [user], error: null };
    }),
  };
});

let updateSpy = vi.fn((user) => {
  return {
    eq: vi.fn(() => {
      return {
        select: vi.fn(() => {
          return { data: [user], error: null };
        }),
      };
    }),
  };
});

let deleteSpy = vi.fn((user) => {
  return {
    eq: vi.fn((_, userId) => {
      return {
        select: vi.fn(() => {
          return { data: [makeFakeRawUser({ userId })], error: null };
        }),
      };
    }),
  };
});

let selectSpy = vi.fn((user) => {
  return {
    eq: vi.fn((_, userId) => {
      return {
        select: vi.fn(() => {
          return { data: [makeFakeRawUser({ userId })], error: null };
        }),
      };
    }),
  };
});

let uploadBucketSpy = vi.fn(async () => {});

const mockTestDbClient = {
  updateSpy: updateSpy,
  upsertSpy: upsertSpy,
  deleteSpy: deleteSpy,
  uploadBucketSpy: uploadBucketSpy,
  storage: {
    from: vi.fn(() => {
      return { upload: uploadBucketSpy };
    }),
  },
  from: vi.fn(() => {
    return {
      update: updateSpy,
      upsert: upsertSpy,
      delete: deleteSpy,
      select: selectSpy,
    };
  }),
};
export default mockTestDbClient;
