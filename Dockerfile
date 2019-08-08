FROM node:10 AS builder
WORKDIR /workspace
COPY . .
RUN npm install
RUN npm run ng -- build --prod

FROM nginx:stable-alpine
WORKDIR /app/minerva
COPY . .
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/dist/intelligence/ /var/www/intelligence
CMD [ "nginx", "-g", "daemon off;" ]
