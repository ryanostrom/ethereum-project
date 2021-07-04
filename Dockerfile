FROM mhart/alpine-node:latest as base

# 1 - Install system dependencies
RUN apk update
RUN apk add --upgrade geth
RUN apk add --no-cache bash
RUN apk add --no-cache git openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz
RUN npm i -g pg

# 2- Install project dependencies
ARG NODE_ENV=development
RUN mkdir -p /app
COPY blockchain /app/blockchain
COPY api /app/api
WORKDIR /app/api
RUN npm i
EXPOSE 5000

# 3  - Initialize blockchain
FROM base as blockchain
WORKDIR /app/blockchain
RUN yarn initialize
CMD ["yarn", "run", "start"]

# 4 - Run API (dev)
FROM base as api-dev
RUN chmod +x /app/api/docker-entrypoint.sh
ENTRYPOINT [ "sh", "/app/api/docker-entrypoint.sh" ]
ENV NODE_ENV development
WORKDIR /app/api
CMD ["npm", "run", "dev"]

# 5 - Run API (prod)
FROM base as api-prod
WORKDIR /app
ENV NODE_ENV production
WORKDIR /app/api
CMD ["npm", "run", "start"]
