FROM node:10-alpine AS node10base
# FROM alpine:3.8 AS node10base

# ENV NODE_VERSION 10.0.0

# RUN addgroup -g 1000 node \
#     && adduser -u 1000 -G node -s /bin/sh -D node \
#     && apk add --no-cache \
#         libstdc++ \
#     && apk add --no-cache --virtual .build-deps \
#         binutils-gold \
#         curl \
#         g++ \
#         gcc \
#         gnupg \
#         libgcc \
#         linux-headers \
#         make \
#         python \
#   # gpg keys listed at https://github.com/nodejs/node#release-keys
#   && for key in \
#     94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
#     FD3A5288F042B6850C66B31F09FE44734EB7990E \
#     71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
#     DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
#     C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
#     B9AE9905FFD7803F25714661B63B535A4C206CA9 \
#     56730D5401028683275BD23C23EFEFE93C4CFFFE \
#     77984A986EBC2AA786BC0F66B01FBB92821C587A \
#     8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
#   ; do \
#     gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
#     gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
#     gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
#   done \
#     && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION.tar.xz" \
#     && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
#     && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
#     && grep " node-v$NODE_VERSION.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
#     && tar -xf "node-v$NODE_VERSION.tar.xz" \
#     && cd "node-v$NODE_VERSION" \
#     && ./configure \
#     && make -j$(getconf _NPROCESSORS_ONLN) \
#     && make install \
#     && apk del .build-deps \
#     && cd .. \
#     && rm -Rf "node-v$NODE_VERSION" \
#     && rm "node-v$NODE_VERSION.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

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

