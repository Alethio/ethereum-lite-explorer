FROM node:8 AS build

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends
COPY package.json package-lock.json ./
RUN npm install

RUN npm i -g @alethio/cms-plugin-tool

COPY . .

RUN npm run build --verbose

RUN acp install \
    @alethio/explorer-plugin-eth-common@1.0.2 \
    @alethio/explorer-plugin-eth-lite@1.0.3 \
    @alethio/explorer-plugin-eth-ibft2@1.0.1 \
    @alethio/explorer-plugin-3box@1.0.1

FROM nginx:stable-alpine

RUN apk add --update jq

COPY --from=build /build/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
# COPY .docker/entrypoint.sh .

# ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
