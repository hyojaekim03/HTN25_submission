import express from "express";
import sqlite3 from "sqlite3";

const port = process.env.PORT || 3000;

const app = express();

// Create a database if none exists
const database = new sqlite3.Database("hackers.db");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example REST Express app listening at http://localhost:${port}`);
});
