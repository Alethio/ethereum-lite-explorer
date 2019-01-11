#!/bin/sh

set -e

echo "setting config"
sed -i -e "s|CFG_URL;|CFG_URL=\"$NODE_URL\";|g" /usr/share/nginx/html/index.html
sed -i -e "s|CFG_USER;|CFG_USER=\"$NODE_URL_USER\";|g" /usr/share/nginx/html/index.html
sed -i -e "s|CFG_PASS;|CFG_PASS=\"$NODE_URL_PASS\";|g" /usr/share/nginx/html/index.html
sed -i -e "s|CFG_INFURA;|CFG_INFURA=\"$INFURA_PROJECT_ID\";|g" /usr/share/nginx/html/index.html

echo "lite explorer started"

exec "$@"