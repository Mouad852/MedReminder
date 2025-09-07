# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Enable Prisma CLI globally (optional)
RUN npx prisma generate

# Start dev server (you can also use `start:dev` if using nodemon)
CMD ["npm", "run", "start:dev"]
