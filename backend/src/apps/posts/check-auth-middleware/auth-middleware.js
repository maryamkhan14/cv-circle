export default function makeAuthMiddleware({producer, consumer}) {
    return async function (req, res, next) {
        if (req.body.userId) {
            const user = req.user;
            if (!user) {
                await producer.connect()
                producer.send({topic: process.env.KAFKA_GET_AUTH_TOPIC, messages: [{userId: req.body.userId}]})
                await producer.disconnect()

                consumer.run({
                    eachMessage: async({topic, partition, message}) => {
                        console.log(
                            "PRODUCER RESPONSE", topic, partition, message
                        )
                    }
                })
            }
            req.user = user;
            next()
        }
    }
}