# FROM nginx:stable-alpine

# RUN rm /etc/nginx/conf.d/default.conf

# COPY /include.websocket /etc/nginx/app/include.websocket
# COPY /include.forwarded /etc/nginx/app/include.forwarded
# COPY /nginx.conf /etc/nginx/conf.d

FROM node:13.12.0-alpine as build

WORKDIR /frontend

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install
COPY ./frontend/ .
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
# COPY  /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
