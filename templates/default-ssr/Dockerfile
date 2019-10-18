###### Stage 1 - Copy the compiled React App
# This could be replaced with an npm build step
# to compile the app within a Docker container
# but it's not necessary if the app is already
# compiled and is just copied in
FROM alpine as build-stage
LABEL author="%%AUTHOR%%"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY out /usr/src/app/build
COPY config /usr/src/app/config

###### Stage 2 - Run production webserver on nginx
FROM nginx:alpine

# Add app-specific configs and files
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html

# nginix images don't run by default on OpenShift because of permissions
# https://torstenwalter.de/openshift/nginx/2017/08/04/nginx-on-openshift.html
# support running as arbitrary user which belongs to the root group
# RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# comment user directive as master process is run as user in OpenShift anyhow
# RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
# If replacing with ${SERVICE_PORT} then /config/nginx.conf needs to be updated
# users are not allowed to listen on priviliged ports so replace default 80 with ${SERVICE_PORT}
# RUN sed -i.bak 's/listen\(.*\)80;/listen ${SERVICE_PORT};/' /etc/nginx/conf.d/default.conf
# EXPOSE ${SERVICE_PORT}
CMD ["nginx", "-g", "daemon off;"]
