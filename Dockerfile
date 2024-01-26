FROM node:18 AS base
WORKDIR /app
COPY package.json yarn.lock ./

FROM base AS deps
RUN yarn --proc

FROM base AS build
COPY . .
RUN yarn && yarn build

FROM node:18-slim
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist .
ENV PORT=4321
EXPOSE ${PORT}
CMD [ "node", "./server/entry.mjs" ]