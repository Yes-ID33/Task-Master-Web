FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env

EXPOSE 3511

CMD ["npm", "run", "dev"]
