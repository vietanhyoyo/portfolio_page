# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire codebase to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Set environment variables
ENV NODE_ENV production

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
