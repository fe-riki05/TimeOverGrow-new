FROM node:14.15.1-alpine

ENV HOME=/app \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

WORKDIR ${HOME}

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build