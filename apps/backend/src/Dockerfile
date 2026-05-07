FROM node:26-alpine

WORKDIR /app

# Remove yarn completely
RUN npm install -g npm@latest && yarn --version || true

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]
