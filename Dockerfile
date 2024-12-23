FROM node:20-alpine

WORKDIR /usr/scr/app

COPY package*.json ./

RUN npm install --production
RUN node ./scripts/insert_words.js

COPY . .

EXPOSE 80
CMD ["node", "index.js"]