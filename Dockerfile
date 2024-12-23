FROM node:20-alpine

WORKDIR /usr/scr/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 80
CMD ["node", "index.js"]