FROM node:9-alpine AS build

WORKDIR /build

RUN apk add --update git python build-base
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /build/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .docker/entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
