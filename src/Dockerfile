# Base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install a simple HTTP server to serve static content
RUN npm install -g http-server

# Serve the application on port 8080
CMD ["http-server", "dist/property-management", "-p", "8080"]
