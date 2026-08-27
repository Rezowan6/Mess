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

# Copy src folder for migrations and seeders configuration access
COPY server/src ./src

# [ অত্যন্ত গুরুত্বপূর্ণ লাইন] কন্টেইনারের ভেতর থেকে ঝামেলার .sequelizerc ফাইলটি থাকলে তা ডিলেট করে দেওয়া হলো
RUN rm -f .sequelizerc server/.sequelizerc

# Create uploads folder
RUN mkdir -p /app/uploads

# Give ownership to non-root user
RUN chown -R node:node /app

# Run as non-root
USER node

EXPOSE 5001

# একদম ডিরেক্ট পাথ এবং ইউআরএল দিয়ে রান করা হলো, এবার Sequelize বাধ্য হয়ে এটি শুনবে
CMD npx sequelize-cli db:migrate --url "mysql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME" --migrations-path src/database/migrations && npx tsx src/database/seeder.ts && node dist/server.js
