FROM node:20.13.1-buster-slim AS build-env
WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["node", "dist/main.js"]