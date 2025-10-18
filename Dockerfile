# Build stage
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install a simple static file server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]