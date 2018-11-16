FROM node:9-alpine AS deps

WORKDIR /build

RUN apk add --update git python build-base
COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM node:9-alpine AS build

COPY --from=deps /build /build
WORKDIR /build

ARG CONNECTION_TYPE=json_rpc
ARG NODE_URL
ARG BASE_URL=/

ENV VUE_APP_CONNECTION_TYPE=${CONNECTION_TYPE}
ENV VUE_APP_NODE_URL=${NODE_URL}
ENV VUE_APP_BASE_URL=${BASE_URL}

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /build/dist /usr/share/nginx/html
COPY nginx.app.conf /etc/nginx/conf.d/default.conf
