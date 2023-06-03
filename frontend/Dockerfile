FROM node:lts-alpine

WORKDIR /srv/app

ENV PATH /srv/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@5.0.1 -g

COPY . ./