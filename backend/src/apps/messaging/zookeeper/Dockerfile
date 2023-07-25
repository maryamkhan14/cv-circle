FROM confluentinc/cp-zookeeper:latest
WORKDIR /app
COPY . .
USER root
CMD [ "bash", "-c", "/etc/confluent/docker/run & /app/ssl-setup; sleep infinity "]