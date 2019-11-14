# Multistage build to optimize the final Docker image size

###### Stage 1 - Install deps and compile the NextJS app
FROM node:lts as build-stage
LABEL author="%%AUTHOR%%"

COPY . /app
WORKDIR /app

# We run npm install here instead of copying
# in a compiled build from an external source
# because node_modules often compiles with
# CPU/OS-specific binaries
# node_modules is deleted here. We can't exclude
# it using .dockerignore because we need the
# docker-compiled version in the docker image
RUN rm -rf node_modules &&\
    npm install &&\
    npm run build

###### Stage 2 - Run production NextJS app server
FROM node:lts
ARG PORT=3000

ENV NODE_ENV=production
    PORT=$PORT
EXPOSE $PORT

COPY --from=build-stage /app /app
WORKDIR /app

CMD [ "npm", "start" ]
