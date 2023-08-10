import { vi } from "vitest";

let upsertSpy = vi.fn((user) => {
  return {
    select: vi.fn(() => {
      return { data: [user], error: null };
    }),
  };
});

const mockTestDbClient = {
  upsertSpy: upsertSpy,
  from: vi.fn(() => {
    return {
      upsert: upsertSpy,
    };
  }),
};
export default mockTestDbClient;
