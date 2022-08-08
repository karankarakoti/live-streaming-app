"use strict";
const path = require("path");

module.exports.getConfig = () => {
  const config = {
    "NODE_ENV": process.env.NODE_ENV,
    "PORT": process.env.PORT,    
    "MONGO_URL": process.env.MONGO_URL,
    "MONGO_USER": process.env.MONGO_USER,
    "MONGO_PASSWORD": process.env.MONGO_PASSWORD,
    "MONGO_DB_NAME": process.env.MONGO_DB_NAME,    
    "JWT_SECRET": process.env.JWT_SECRET,
    "API_URL": process.env.API_URL,
    "MAIL_HOST": process.env.MAIL_HOST,
    "MAIL_PORT": process.env.MAIL_PORT,
    "MAIL_USER": process.env.MAIL_USER,
    "MAIL_PASS": process.env.MAIL_PASS,
    "UPLOAD_PATH": path.resolve( `${__dirname }/../../uploads` ),
  }

  return config
};