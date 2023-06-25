import { vi } from "vitest";
import realTestDbClient from "./db";

let upsertSpy = vi.fn(() => {
  return {
    select: vi.fn(() => {}),
  };
});

const mockTestDbClient = {
  ...realTestDbClient,
  upsertSpy: upsertSpy,
  from: vi.fn(() => {
    return {
      upsert: upsertSpy,
    };
  }),
};
export default mockTestDbClient;
