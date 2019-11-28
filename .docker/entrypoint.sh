#!/bin/sh

set -e

if [ ! -f /usr/share/nginx/html/config.json ]; then
    echo "Setting config"
    /app/set-env-vars.js /app/config.default.json /usr/share/nginx/html/config.json
fi

if [[ ! -z "$APP_BASE_URL" ]]; then
    echo "Setting custom APP_BASE_URL"
    escaped_base_url=$(printf '%s\n' "$APP_BASE_URL" | sed 's:[\/&]:\\&:g;$!s/$/\\/')
    sed -i.bak "s/https:\/\/lite-explorer.aleth.io/$escaped_base_url/" /usr/share/nginx/html/index.html
fi

echo "Lite Explorer started"

exec "$@"
