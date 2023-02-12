FROM node:18-alpine

WORKDIR /working

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR /working/build

RUN npm install -g http-server

CMD ["http-server", "-p", "3000"]