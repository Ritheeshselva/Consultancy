FROM node:20-alpine AS frontend-build

WORKDIR /app/Frontend

COPY Frontend/package*.json ./
RUN npm ci

COPY Frontend/ ./
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

FROM node:20-alpine AS backend-run

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/ ./
COPY --from=frontend-build /app/Frontend/dist ./public

ENV NODE_ENV=production
ENV PORT=5002

EXPOSE 5002

CMD ["node", "src/server.js"]