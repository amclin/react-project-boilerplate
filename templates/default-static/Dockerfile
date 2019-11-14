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
FROM nginx:alpine
ARG PORT=3000

# Add app-specific configs and files
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/out /usr/share/nginx/html

# nginix images don't run by default on OpenShift because of permissions
# https://torstenwalter.de/openshift/nginx/2017/08/04/nginx-on-openshift.html
# support running as arbitrary user which belongs to the root group
# RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# comment user directive as master process is run as user in OpenShift anyhow
# RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

# Users are not allowed to listen on priviliged ports so replace default 80 with ${PORT}
RUN sed -i.bak "s/listen\(.*\)80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
