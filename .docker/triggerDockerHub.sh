#!/bin/bash

if ! [ -z "$CIRCLE_BRANCH" ]; then
    SOURCE_TYPE='Branch';
    SOURCE_NAME=$CIRCLE_BRANCH;
elif ! [ -z "$CIRCLE_TAG" ]; then
    SOURCE_TYPE='Tag';
    SOURCE_NAME=$CIRCLE_TAG;
else
    echo 'No branch or tag specified!';
    exit 1;
fi

DOCKER_HUB_URL="https://cloud.docker.com/api/build/v1/source/$DOCKER_HUB_SOURCE/trigger/$DOCKER_HUB_TRIGGER/call/";
HEADER="Content-Type: application/json";
DATA_TO_SEND="{\"source_type\": \"$SOURCE_TYPE\", \"source_name\": \"$SOURCE_NAME\"}";

curl -s -v -w "\n%{http_code}" -H "$HEADER" --data "$DATA_TO_SEND" -X POST "$DOCKER_HUB_URL" | {
    read body;
    read code;

    echo "Curl response:"
    echo "Http Code: $code";
    echo "Body: $body";

    if [ $code -eq 202 ]; then
        exit 0;
    else
        exit 1;
    fi;
}
