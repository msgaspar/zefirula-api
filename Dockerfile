FROM node:20.17.0-alpine

WORKDIR /usr/src/zefirula-api

COPY package.json yarn.lock* ./

RUN yarn install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]
