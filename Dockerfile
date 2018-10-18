FROM node:9-alpine

WORKDIR /app

RUN apk update && \
    apk upgrade && \
    apk add git && \
    apk add python && \
    apk add build-base
ADD package.json package-lock.json ./

RUN npm install


ADD . .

EXPOSE 8080

CMD [ "npm", "run", "serve"]