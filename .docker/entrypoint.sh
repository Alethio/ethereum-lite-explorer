#!/bin/sh

set -e

echo "setting config"

jq -n 'env | with_entries(select(.key | test("^APP_")))'  >> /usr/share/nginx/html/config.json

echo "lite explorer started"

exec "$@"
