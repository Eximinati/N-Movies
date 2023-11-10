# Use a Node.js LTS image
FROM node:lts-buster

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the necessary port(s) for the application
EXPOSE 3000

# Add a label to specify that this application is made with Remix
LABEL app="Remix"

# Start the application
CMD ["pnpm", "dev"]
