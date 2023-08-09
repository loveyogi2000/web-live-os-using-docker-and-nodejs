FROM ubuntu
RUN apt-get update
RUN apt-get install node:16.20.0
RUN apt-get install docker.io
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install express
EXPOSE 3000
CMD ["npm", "start"]
CMD ["service", "docker","start"]
