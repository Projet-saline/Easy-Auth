FROM node:alpine
RUN apk update && apk add mysql-client
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${APP_PORT}
CMD [ "node", "app.js" ]
