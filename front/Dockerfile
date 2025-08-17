FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y vim

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]