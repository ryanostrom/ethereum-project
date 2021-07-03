FROM mhart/alpine-node:latest as base

# 1- Install Dockerize
RUN apk add --no-cache git openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz

# 2- Configure directory

ARG NODE_ENV=development

RUN mkdir -p /app

# 3 - Install geth+bash
RUN apk update
RUN apk add --upgrade geth
RUN apk add --no-cache bash

# 4- Install dependencies
FROM base as build-blockchain
WORKDIR /app
ADD blockchain ./blockchain

# 5  - Initialize blockchain
WORKDIR /app/blockchain
RUN yarn initialize

# 6- Set env vars
FROM base as blockchain

ARG NODE_ENV=development
ENV NODE_ENV "${NODE_ENV}"

# 6- Build dist files
WORKDIR /app
COPY --from=build-blockchain /app ./

# 7- Run
WORKDIR /app/blockchain
CMD ["yarn", "run", "start"]

