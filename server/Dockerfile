FROM node:lts-alpine

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "sh", "start.sh" ]

