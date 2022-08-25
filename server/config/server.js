const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const { setRoutes } = require("./routes");

const server = express();

server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const corsOptions = { "origin": "*" };
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("views", path.join(__dirname, "../views"));
server.set("view engine", "ejs");
setRoutes(server);

module.exports = { server };