FROM confluentinc/cp-kafka-connect:latest
WORKDIR /app
COPY connectors-config . 
ENV CONNECT_PLUGIN_PATH="/usr/share/java,/usr/share/confluent-hub-components,/data/connect-jars"
RUN bash -c confluent-hub install --no-prompt redis/redis-enterprise-kafka:6.7.4  /etc/confluent/docker/run &
