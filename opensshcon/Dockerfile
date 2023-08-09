
FROM ubuntu

# Install required packages
RUN apt-get update && apt-get install -y openssh-server sudo -y

RUN apt-get update && apt-get install -y sudo

RUN sed -i 's/#PermitEmptyPasswords no/PermitEmptyPasswords yes/' /etc/ssh/sshd_config

RUN service ssh start
# Add entrypoint script to create user with container name
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Set entrypoint script as the container's entrypoint
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 22

# Start the SSH daemon
CMD ["/usr/sbin/sshd", "-D"]


