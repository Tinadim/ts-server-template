# This file is just an example and should not be used in production

FROM node:lts-alpine

WORKDIR /usr/src/ts-api-server-template

COPY package*.json ./

RUN apk add --update curl && rm -rf /var/cache/apk/*

RUN npm ci --production

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/index.js" ]