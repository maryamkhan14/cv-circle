import messageBus from "./client.js";
import buildProducer from "./producer.js";
const producer = buildProducer({
  producer: messageBus.producer({ allowAutoTopicCreation: true }),
});
export { producer };
