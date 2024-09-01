# develop stage
FROM --platform=linux/amd64 node:18.14-alpine as develop-stage
WORKDIR /app

RUN npm install -g @quasar/cli


# build stage
FROM develop-stage as build-stage
COPY . .
RUN npm install
RUN quasar build

# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /app/dist/spa /etc/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
