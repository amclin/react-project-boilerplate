#!/usr/bin/env bash

echo "Executing Docker build for %%APPNAME%%"
# //TODO: Fully support Docker naming/tag structure,
# Best to populate these variables from the CICD pipeline
# "docker build -t ${REPO_URL}/${BUILD_NAME}:${BUILD_IMAGE_VERSION} --build-arg APP_ENV=production --build-arg APP_NAME=${BUILD_NAME} --build-arg DEPLOY_ARTIFACT_DIR=. --build-arg SERVICE_PORT=${SOURCE_PORT} --rm=true --no-cache ."

docker build -t react-example/%%APPNAME%% .
