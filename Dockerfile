# Use the official Node.js 20 image as a parent image
FROM node:20

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm packages
# Use --production flag to avoid installing devDependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Provide execute permission
RUN chmod +x ./generate_rsa_keys.sh

# script to generate RSA keys
RUN ./generate_rsa_keys.sh

# Install PM2
RUN npm install pm2 -g

# Expose the port 3000
EXPOSE 3000

# command to run PM2 and app
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]
