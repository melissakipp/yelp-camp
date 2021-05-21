FROM node:14.16.1-alpine3.10
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN npm install nodemon -g
COPY ["package*.json", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD npm start