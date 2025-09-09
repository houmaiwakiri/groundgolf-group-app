FROM node:22

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y vim

RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]