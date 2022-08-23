const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(path.dirname(__dirname), "../public"))
  },
  filename: function(req, file, cb){
      cb(null, shortid.generate() + ".jpg")
  }
})

exports.upload = multer({ storage })