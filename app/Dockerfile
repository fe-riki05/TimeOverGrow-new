FROM node:14.15.1-alpine

ENV HOME=/app \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0
    # Herokuにdeployする時
    # NODE_ENV=production
    # deployする時に一緒にダウンロードする
    # NPM_CONFIG_PRODUCTION=false

WORKDIR ${HOME}

# 本番deploy用コマンド
# COPY package*.json ./
# RUN yarn install

# COPY . .

# RUN yarn run build