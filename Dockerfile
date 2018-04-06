FROM node:9

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY src /app/src

COPY .env /app/.env

CMD [ "bash", "-c", "npm run migrations && npm start" ]