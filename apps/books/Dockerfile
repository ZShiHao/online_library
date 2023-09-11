FROM node:19.2.0-alpine

WORKDIR /app

COPY package.json .
RUN npm install -g pnpm
RUN pnpm install --prod

COPY . .

CMD ["pnpm", "start"]