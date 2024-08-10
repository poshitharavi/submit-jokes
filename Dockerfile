## Use the official Node.js 16 image as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the Prisma schema
COPY prisma ./prisma/

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
