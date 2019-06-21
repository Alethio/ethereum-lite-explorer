#!/bin/sh

set -e

if [ ! -f /usr/share/nginx/html/config.json ]; then
    echo "Setting config"
    /app/set-env-vars.js
    cp /app/config.json /usr/share/nginx/html/config.json
fi

if [[ ! -z "$APP_BASE_URL" ]]; then
    echo "Setting custom APP_BASE_URL"
    sed -i.bak "s/https:\/\/lite-explorer.aleth.io/$APP_BASE_URL/" /usr/share/nginx/html/index.html
fi

echo "Lite Explorer started"

exec "$@"
