# Build stage
FROM node:18-alpine as build
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy project files
COPY . .
# Copy .env file
COPY .env .env
# Build the project
RUN npm run build
# Production stage
FROM nginx:alpine
# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html
# Optionally, copy a custom nginx configuration file
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]