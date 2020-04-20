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
    npm run build &&\
    npm run export

###### Stage 2 - Run production webserver on nginx
# We use a non-root version of Nginx for security reasons:
# https://hub.docker.com/r/nginxinc/nginx-unprivileged
FROM nginxinc/nginx-unprivileged:alpine

ARG PORT=3000

# Add app-specific configs and files
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/out /usr/share/nginx/html

# Non-root users are not allowed to listen on priviliged ports so replace default 80 with ${PORT}
USER root
RUN sed -i.bak "s/listen\(.*\)80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf
USER 101
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
