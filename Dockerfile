# ============================================================================
# Stage 1 - Build React (Vite) Client
# ============================================================================

FROM node:22-bookworm-slim AS client-build

WORKDIR /app/client

# Install dependencies first (better Docker cache)
COPY client/package*.json ./
RUN npm install --no-audit --no-fund

# Copy source code
COPY client/ ./

# Empty = browser calls /api on same origin
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}


# Build client
RUN npm run build


# ============================================================================
# Stage 2 - Build Express API
# ============================================================================

FROM node:22-bookworm-slim AS server-build

WORKDIR /app

# Install dependencies first (better Docker cache)
COPY server/package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source code
COPY server/ ./

# Compile TypeScript
RUN npm run build


# ============================================================================
# Stage 3 - Production Runtime
# ============================================================================

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only
COPY server/package*.json ./

RUN npm ci \
    --omit=dev \
    --no-audit \
    --no-fund \
 && npm cache clean --force

# Copy compiled server
COPY --from=server-build /app/dist ./dist

# Copy built React app
COPY --from=client-build /app/client/dist ./public

COPY --from=server-build /app/src/database ./src/database
COPY server/.sequelizerc ./

# Give ownership to non-root user
RUN chown -R node:node /app

RUN mkdir -p /app/uploads \
 && chown -R node:node /app

# Run as non-root
USER node

EXPOSE 5001

CMD ["sh", "-c", "npm run migrate && npm run seed && node dist/server.js"]