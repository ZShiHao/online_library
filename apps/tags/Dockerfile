FROM base

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
RUN pnpm install --prod

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]