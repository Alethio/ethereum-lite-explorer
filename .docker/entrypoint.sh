#!/bin/sh

set -e

echo "setting config"

/app/set-env-vars.js

cp /app/config.json /usr/share/nginx/html/config.json

echo "lite explorer started"

exec "$@"
