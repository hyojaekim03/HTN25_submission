FROM node:18
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package*.json /src/app
RUN npm install
COPY . /src/app
RUN npm install -g ts-node typescript
RUN npm run build
EXPOSE 3000
CMD ["sh", "-c", "ts-node src/db/init.db.ts && npm start"]