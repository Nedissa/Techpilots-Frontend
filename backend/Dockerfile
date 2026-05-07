FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]
