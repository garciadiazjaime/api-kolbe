FROM node:boron

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3033

CMD [ "npm", "start" ]
