FROM node:14.15.1-alpine

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

ENV HOST 0.0.0.0
EXPOSE 3000
