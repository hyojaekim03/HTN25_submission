FROM node:18

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /src

COPY package*.json /src/

RUN npm install
RUN npm install -g ts-node typescript
RUN npm install sqlite3  # Explicitly install sqlite3
RUN npm install @types/sqlite3 --save-dev  # Install type definitions for sqlite3

COPY . /src/

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "ts-node src/db/init.db.ts && ts-node src/scripts/insertData.scripts.ts && npm start"]

