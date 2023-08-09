
Title: Creating a Web-Based Live Ubuntu OS using Docker and Node.js

Description: This guide outlines the steps to set up a web-based live Ubuntu OS using Docker and Node.js. Users can launch their own separate Ubuntu containers with just a single click.

**Getting Started**

1. Clone the repository:
   ```bash
   git clone [repository_url]
   ```

2. Install Docker, MongoDB, and Node.js on your system. or if your using ubuntu you can use script.sh to install all req packages

3. Start Docker service using the command:
   ```bash
   service docker start
   ```

4. Start MongoDB service using the command:
   ```bash
   service mongod start
   ```

**Setting Up the Web OS**

5. Navigate to the 'opensshcon' directory.

6. Build a Docker image for 'opensshcon':
   ```bash
   docker build -t opensshcon .
   ```

7. Find your IP address using the command:
   ```bash
   ifconfig
   ```

8. Open 'lab.html' in the 'frontend' directory under 'nodejs' directory.

9. Replace IP_ADDRESS in the following line with your IP address:
   ```html
   <iframe src="http://IP_ADDRESS:<%=message%>/wetty/ssh/<%=username%>" frameborder="0" allowfullscreen></iframe>
   ```

10. Edit the Node.js app and update the IP address:
    ```javascript
    const command2 = `docker run --rm --name ${containerName}_wetty -dp ${port2}:3000 wettyoss/wetty --ssh-host=IP_ADDRESS --ssh-port=${port} --allow-iframe --iframe-allow-from=*`;
    ```

11. Navigate to the 'nodejs' directory and start the application:
    ```bash
    npm start
    ```

12. Access the web-based OS by opening http://localhost:3000/home in your browser.

13. Log in and navigate to the 'Lab' section. Wait for a few seconds and refresh the page; your live OS will be displayed.

Enjoy your web-based live Ubuntu OS experience with your personalized container!
