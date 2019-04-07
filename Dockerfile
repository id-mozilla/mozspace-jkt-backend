# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:8.9.0

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
ENV PORT 4000
CMD [ "npm", "start" ]


