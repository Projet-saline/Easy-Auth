FROM node:alpine
RUN apk update
WORKDIR /usr/src/_app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3009
CMD ["npm", "start"]