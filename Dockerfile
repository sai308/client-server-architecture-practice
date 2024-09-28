# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /srv/app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "app.js"]
