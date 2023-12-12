# Stage 1: Build the application
FROM node:18 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

# Stage 2: Setup the production environment
FROM node:18-slim

WORKDIR /usr/src/app

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/build ./build
COPY package*.json ./


# Your application's default port
EXPOSE 8080

CMD ["node", "build/index.js"]
