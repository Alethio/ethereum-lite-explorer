FROM node:10.16 AS build

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm install

RUN npm i -g @alethio/cms-plugin-tool@^1.0.0-beta.5

COPY . .

RUN npm run build --verbose

RUN acp install \
    @alethio/explorer-plugin-eth-common@3.0.0 \
    @alethio/explorer-plugin-eth-lite@4.1.0 \
    @alethio/explorer-plugin-eth-memento@2.0.0 \
    @alethio/explorer-plugin-eth-ibft2@2.0.0 \
    @alethio/explorer-plugin-3box@1.1.0

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
