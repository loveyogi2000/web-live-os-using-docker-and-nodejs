#!/bin/bash

# Create a new user with the container name and no password
username=${CONTAINER_NAME}
useradd -m -s /bin/bash "$username"

# Give the new user sudo privileges
passwd $username -d 
sudo -k
# Start the SSH daemon
/usr/sbin/sshd -D

