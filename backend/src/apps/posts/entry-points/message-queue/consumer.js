export default function makeConsumer({ broker }) {
  return broker.consumer({
    groupId: process.env.MESSAGE_QUEUE_GROUP_ID,
  });
}
