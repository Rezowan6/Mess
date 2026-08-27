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

# মাইগ্রেশন এবং সিড রান করার জন্য প্রোডাকশনে গ্লোবালি tsx এবং sequelize-cli ইনস্টল করা হলো
RUN npm install -g tsx sequelize-cli

# Copy compiled server
COPY --from=server-build /app/dist ./dist

# Copy built React app
COPY --from=client-build /app/client/dist ./public

# Copy src folder for migrations and seeders configuration access
COPY server/src ./src

# Create uploads folder
RUN mkdir -p /app/uploads

# Give ownership to non-root user
RUN chown -R node:node /app

# Run as non-root
USER node

EXPOSE 5001

# .sequelizerc এর পাথ ধরে সরাসরি Railway variables দিয়ে মাইগ্রেশন ও সিড রান
CMD npx sequelize-cli db:migrate --url "mysql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME" && npx tsx src/database/seeder.ts && node dist/server.js
