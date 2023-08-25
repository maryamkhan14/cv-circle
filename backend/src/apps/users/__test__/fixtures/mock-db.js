import { vi } from "vitest";

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

let uploadBucketSpy = vi.fn(async () => {});

const mockTestDbClient = {
  updateSpy: updateSpy,
  upsertSpy: upsertSpy,
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
    };
  }),
};
export default mockTestDbClient;
