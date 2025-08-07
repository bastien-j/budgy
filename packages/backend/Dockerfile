FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS build
COPY . /app
WORKDIR /app
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm run --filter=backend build

FROM base
COPY --from=build /app/packages/backend/build /app/packages/backend/ecosystem.config.cjs /app
WORKDIR /app
RUN corepack enable \
    && pnpm i -g pm2 \
    && pnpm install --prod
EXPOSE 3333
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
