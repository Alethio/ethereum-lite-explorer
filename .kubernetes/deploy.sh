#!/bin/sh

set -e

# Get config.json contents based on first program arg or default then escape special chars for sed replacements string then indent all lines with 4 spaces to align with output yaml
config_json=$(cat ${1:-"../config.default.json"} | sed 's:[\/&]:\\&:g;$!s/$/\\/' | sed 's/^/    /')

# Replace the placeholder from input yaml file and write a new one
cat configmap.yaml | sed "s/    CONFIG_JSON/$config_json/" > configmap.generated.yaml

kubectl apply -f configmap.generated.yaml
kubectl apply -f explorer-deployment.yaml
kubectl apply -f explorer-service.yaml

# Clean up
rm configmap.generated.*
