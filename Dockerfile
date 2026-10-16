FROM node:22-bookworm-slim AS development

ENV ASTRO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --no-audit --no-fund && npm cache clean --force

COPY --chown=node:node . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321"]

FROM development AS build
RUN npm run build
