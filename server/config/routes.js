"use strict";
const express = require("express");
const path = require("path");
const { HttpError } = require("../system/helpers/HttpError");
const apiRoutes = require("../system/routes");

module.exports.setRoutes = (app) => {

  app.get("/", (req, res) => {    
    res.render('welcome.ejs',{
      title: "Live Video Streaming",
      desc: "Server Running🔥🔥"     
    });
  });

  app.use("/api", apiRoutes);

  app.use("/media", express.static(path.join(__dirname, "../../uploads")));
  app.use("/public", express.static(path.join(__dirname, "../public")));

  app.use("/*", (req, res) => {
    const error = new Error("Requested path does not exist.");
    error.statusCode = 404;    
    res.status(error.statusCode).json( new HttpError(error));
  });
}