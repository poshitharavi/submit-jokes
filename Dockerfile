## Use the official Node.js 16 image as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and Prisma CLI
RUN npm ci && npm install -g prisma

# Copy the Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN prisma generate

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Map the port the app runs on
EXPOSE 8080

# Command to run the app
CMD [ "npm", "run", "start:prod" ]
