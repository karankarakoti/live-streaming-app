"use strict";

const express = require("express");
const router = express.Router();
const pluralize = require("pluralize");
const path = require("path");
const fs = require("fs");

pluralize.addUncountableRule("auth");
pluralize.addUncountableRule("app");
pluralize.addUncountableRule("media");

const { HttpError } = require("../helpers/HttpError");
const routesPath = path.resolve(`${__dirname}/../../src/routes`);
const PATHS = fs.readdirSync(routesPath);
const moduleMapper = [];

console.log("✔ Mapping Routes");
PATHS.forEach((module) => {
  if(module !== "index.js"){
    const name = module.split(".")[0];
    router.use(`/${pluralize.plural(name)}`, require(path.resolve(routesPath, module)));
    moduleMapper.push({
      "Module": name,
      "Route": `/${pluralize.plural( name )}`
    });
  }
});

console.table(moduleMapper);

router.use((err, req, res, next) => {
  if(process.env.NODE_ENV !== "production"){
    console.error(req.method, req.url, err.statusCode, err.message);
  }
  const error = new HttpError(err);

  res.status(err.statusCode);
  res.json(error);
  next();
});

module.exports = router;