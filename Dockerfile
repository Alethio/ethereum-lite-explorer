FROM node:10 AS build

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm install

RUN npm i -g @alethio/cms-plugin-tool

COPY . .

RUN npm run build --verbose

RUN acp install \
    @alethio/explorer-plugin-eth-common@2.0.0 \
    @alethio/explorer-plugin-eth-lite@2.0.4 \
    @alethio/explorer-plugin-eth-ibft2@1.0.1 \
    @alethio/explorer-plugin-3box@1.0.1

FROM nginx:stable-alpine

RUN apk update && \
    apk add nodejs

COPY --from=build /build/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY config.default.json .
COPY set-env-vars.js .
COPY .docker/entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
