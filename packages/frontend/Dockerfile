FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS build
COPY . /app
WORKDIR /app
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm run --filter=frontend build

FROM base
COPY --from=build /app/packages/frontend/.output /app/.output
COPY --from=build /app/packages/frontend/ecosystem.config.cjs /app/ecosystem.config.cjs
WORKDIR /app
RUN corepack enable \
    && pnpm i -g pm2
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
