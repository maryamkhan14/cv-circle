FROM node:18
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN apt-get update && apt-get install -y graphicsmagick
RUN apt-get update && apt-get install -y ghostscript
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi
COPY . ./
ENV PORT=3000
EXPOSE $PORT
CMD ["node", "entry-points/server.js"]