FROM node:18
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package*.json /src/app
RUN npm install
COPY . /src/app
EXPOSE 3000
CMD ["sh", "-c", "ts-node src/db/initDb.ts && npm start"]
