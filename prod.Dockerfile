# -------------------
# Stage 1: Build
# -------------------
FROM node:22 AS build

# Set SHELL environment variable to a supported shell
ENV SHELL=/bin/bash

# Install pnpm globally using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set PNPM_HOME to define the global bin directory and add it to PATH
ENV PNPM_HOME=/node/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Set the working directory
WORKDIR /srv/node/app

# Copy only the necessary files for installation
COPY package*.json ./

# Fetch dependencies for caching
RUN pnpm fetch

# Install production dependencies only
RUN pnpm install --prod

# Copy the application code
COPY --chown=node:node . .

# Build the application if necessary (e.g., Prisma, TypeScript)
RUN if [ "$PRISMA_REBUILD_CLIENT" = "true" ]; then pnpm db:client; fi

# -------------------
# Stage 2: Production
# -------------------
FROM node:22 AS production

# Set SHELL environment variable to a supported shell
ENV SHELL=/bin/bash

# Set NODE_ENV to production
ENV NODE_ENV=production
ENV PNPM_HOME=/node/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Install pnpm globally using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Run pnpm setup to configure global bin directory
RUN pnpm setup

# Install pm2 globally
RUN pnpm install -g pm2

# Install pm2-logrotate for log rotation
RUN pm2 install pm2-logrotate

# Set the working directory
WORKDIR /srv/node/app

# Copy the built application from the build stage
COPY --from=build /srv/node/app /srv/node/app

# Switch to the node user
USER node

# Expose the application port
EXPOSE 3000

# Run the app in cluster mode
CMD ["pm2-runtime", "./.pm2/ecosystem.config.js", "--env", "production"]
