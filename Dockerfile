FROM node:10-alpine AS node10base

FROM node10base AS test

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/

# Install needed packages for testing
RUN apk update && apk upgrade \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && apk add --no-cache \
    chromium@edge \
    nss@edge \
    curl \
    xvfb \
    && rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/* \
# Install @angular\cli
    && npm install --verbose -g @angular/cli@7.0.7



WORKDIR /app

# Install npm modules
COPY package*.json /app/
RUN npm install

COPY . .
# Xvfb
ENV DISPLAY=:99
RUN Xvfb :99 & \
npm run test-ci

## e2e test  failing right now
RUN Xvfb :99 & \
npm run e2e-ci

FROM node10base AS build

#FROM node:10-alpine AS build




WORKDIR /app
COPY . .

# Run npm install
RUN npm install

RUN npm run build-deploy

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

