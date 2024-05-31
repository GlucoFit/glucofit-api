# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Download and install Cloud SQL Auth Proxy
RUN curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.3/cloud-sql-proxy.linux.amd64 \
    && chmod +x cloud-sql-proxy

# Expose the port that your app runs on
EXPOSE 8080

# Command to run your application
CMD ["sh", "-c", "./cloud-sql-proxy --address 127.0.0.1 --port 3306 capstone-playground-423804:asia-southeast2:glucofit-test-sql --private-ip & npm start"]
