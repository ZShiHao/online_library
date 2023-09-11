FROM node:19.2.0-alpine

WORKDIR /app
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

RUN pnpm install