# Use official Bun image as base
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy necessary application files
COPY . .

# Install dependencies
RUN bun install

# Expose the application port
EXPOSE 8084

# Command to run the application
CMD ["bun", "run", "start", "--port", "8084"]
