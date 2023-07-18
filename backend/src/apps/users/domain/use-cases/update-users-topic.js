export default function makeUpdateUsersTopic({ producer }) {
  console.log("PRODUCER", producer);
  producer.connect();
  return function (user) {
    producer.send("user-logged-in", user); // TODO change to env
  };
}
