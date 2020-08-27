FROM node:lts-slim

WORKDIR /usr/app/

COPY package.json ./
COPY yarn.lock ./

RUN yarn --prod

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
