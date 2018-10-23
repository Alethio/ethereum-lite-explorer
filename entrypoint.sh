#!/bin/bash



_term() {
  echo "Caught SIGTERM signal!"
  kill -TERM "$child" 2>/dev/null
}

trap _term SIGTERM

echo "Doing some initial work...";
sed -i 's@Object({NODE_ENV:\"production\",BASE_URL:\"\/\"})@Object({NODE_URL: '"'$NODE_URL'"', CONNECTION_TYPE: '"'$CONNECTION_TYPE'"'})@g' js/* & serve -l 8080 -s &

child=$!
wait "$child"
