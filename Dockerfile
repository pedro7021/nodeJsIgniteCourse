FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . /usr/app/

EXPOSE 3333

CMD [ "npm","run","dev" ]