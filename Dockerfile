# Stage 1: Build the Angular application
FROM node:18 AS build

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

# Stage 2: Serve app with nginx server
FROM nginx:alpine

# Copy built assets from builder stage to nginx public folder
COPY --from=build /app/dist/your-angular-app-name/browser /usr/share/nginx/html

# Expose port for the nginx server
EXPOSE 80

# Start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]


