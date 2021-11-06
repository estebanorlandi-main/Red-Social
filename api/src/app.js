const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);

require("./db.js");

const server = express();

server.name = "API";

server.use(express.json({ limit: "50mb" }));
server.use(cookieParser(JWT_SECRET));
server.use(morgan("dev"));

// nuevo y mejorado cors
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

const routes = require("./routes/index.js");
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
