FROM node:18
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi
COPY . ./
ENV PORT=3001
EXPOSE $PORT
CMD ["node", "entry-points/server.js"]