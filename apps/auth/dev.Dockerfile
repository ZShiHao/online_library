FROM base

WORKDIR /app

ENV NODE_ENV=development

COPY package.json .
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]