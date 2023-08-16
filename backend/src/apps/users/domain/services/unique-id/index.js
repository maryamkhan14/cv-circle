import { createId } from "@paralleldrive/cuid2";

const uniqueId = Object.freeze({
  makeId: createId, // TODO: Add isValidId()
});

export default uniqueId;
