#!/bin/bash

# Update package lists
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Start and enable MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Display installation status
echo "Docker, Node.js, and MongoDB have been installed and started."

# Display Docker version
docker --version

# Display Node.js and npm versions
node --version
npm --version

# Display MongoDB version
mongod --version

