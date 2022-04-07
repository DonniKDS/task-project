FROM node:17.5.0-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ['npm', 'run', 'start:dev']