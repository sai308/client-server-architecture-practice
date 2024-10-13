# First stage: Development environment
FROM node:22 AS development

# Create and set the working directory inside the container
WORKDIR /srv/node/app

# Install nodemon globally for development environment
RUN npm install -g nodemon

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY --chown=node:node . .

# Switch to the node user
USER node

RUN if [ "$REBUILD_PRISMA_CLIENT" = "true" ]; then \
  npm db:sync && npx prisma generate; \
  fi
# Expose the port the app runs on
EXPOSE 3000

# Expose the debugging port
EXPOSE 9229

# Set the NODE_ENV environment variable to development by default
ENV NODE_ENV=development

# Use nodemon for automatic server reloads in development
CMD ["nodemon", "--inspect=0.0.0.0:9229", "server.js"]
