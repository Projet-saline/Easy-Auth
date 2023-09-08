FROM node:alpine
RUN apk update
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3008
CMD ["npm", "start"]