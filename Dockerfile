#Node LTS https://hub.docker.com/_/node
FROM node:alpine3.11

EXPOSE 3030
WORKDIR /usr/src/app

#cp the app
COPY . ./
RUN npm install

#start app
CMD [ "node", "src/index.js" ]
