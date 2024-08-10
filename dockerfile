FROM node:20.11.0-alpine

ENV TZ=Asia/Kolkata

RUN apk add --no-cache bash curl tzdata

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm i -g typescript ts-node express @types/express

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
