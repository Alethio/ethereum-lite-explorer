FROM node:9-alpine AS build

WORKDIR /build

RUN apk add --update git python build-base
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG CONNECTION_TYPE=json_rpc
ARG NODE_URL
ARG NODE_USER
ARG NODE_PASS
ARG BASE_URL=/

ENV VUE_APP_CONNECTION_TYPE=${CONNECTION_TYPE}
ENV VUE_APP_NODE_URL=${NODE_URL}
ENV VUE_APP_NODE_USER=${NODE_USER}
ENV VUE_APP_NODE_PASS=${NODE_PASS}
ENV VUE_APP_BASE_URL=${BASE_URL}

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /build/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .docker/entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
