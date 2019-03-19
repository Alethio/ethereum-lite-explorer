FROM node:8 AS build

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --verbose

FROM nginx:stable-alpine

RUN apk add --update jq

COPY --from=build /build/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .docker/entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
