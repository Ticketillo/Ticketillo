FROM node:16.13.0 as base
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]

FROM base as build
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
RUN yarn
COPY . .
RUN yarn build

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
RUN mkdir /app/data

CMD [ "./dist/src/main" ]
