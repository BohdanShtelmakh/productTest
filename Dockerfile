FROM node:14

WORKDIR /app

RUN npm i -g pm2 -yq

COPY . .

RUN npm install

CMD pm2-runtime start ecosystem.config.js --watch