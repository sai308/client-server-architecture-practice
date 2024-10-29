# First stage: Development environment
FROM node:22 AS development

# Set SHELL environment variable to a supported shell
ENV SHELL=/bin/bash

# Install pnpm globally using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set PNPM_HOME to define the global bin directory and add it to PATH
ENV PNPM_HOME=/node/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Run pnpm setup to configure global bin directory
RUN pnpm setup

# Create and set the working directory inside the container
WORKDIR /srv/node/app

# Copy package.json and install dependencies
COPY package*.json ./

# Fetch dependencies for caching, without creating a node_modules folder
RUN pnpm fetch

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY --chown=node:node . .

# Switch to the node user
USER node

# Conditionally sync the database and rebuild Prisma Client
RUN if [ "$PRISMA_SYNC_DB" = "true" ]; then pnpm db:sync; fi && \
  if [ "$PRISMA_REBUILD_CLIENT" = "true" ]; then pnpm db:client; fi


# Expose the port the app runs on
EXPOSE 3000

# Expose the debugging port
EXPOSE 9229

# Set the NODE_ENV environment variable to development by default
ENV NODE_ENV=development

# Use nodemon for automatic server reloads in development
CMD ["pnpm", "exec", "nodemon", "--inspect=0.0.0.0:9229", "server.js"]
