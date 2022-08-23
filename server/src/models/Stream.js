const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const config = require("../../config/config").getConfig();
const jwtKey = config.JWT_SECRET;
const jwtExpiryDays = "365D";

class Stream{
  initSchema(){
    const schema = new Schema({
      "streamTitle": {
        "type": String,
        "required": true
      },
      "createdBy": {
        "type": Schema.Types.ObjectId,
        "required": true,
        "ref": "user"
      },
      "streamKey": {
        "type": String,
        "required": true
      },
      "streamThumbnail": {
        "type": String,
        "required": false
      },
      "isStreamingNow": {
        "type": Boolean,
        "required": true,
        "default": false
      },
      "isSecuredStream": {
        "type": Boolean,
        "required": true,
        "default": false
      },
      "streamPrice": {
        "type": Number,
        "required": false        
      },
      "accessibleTo": {
        "type": [
          {
            "type": Schema.Types.ObjectId,
            "required": false,
            "ref": "user"
          }
        ],
        "required": false,
        "select": false
      },
      "isStreamFinish": {
        "type": Boolean,
        "required": true,
        "default": false
      },
    }, {"timestamps": true});

    schema.pre("save", function(next){
      const stream = this;
      next();
    });

    schema.statics.findByStreamKey = function(streamKey){
      return this.findOne({ "streamKey": streamKey });
    }

    schema.statics.generateStreamToken = async function(data){
      try{
        const token = await jwt.sign({
          user: data.user,
          stream: data.stream
        }, jwtKey, {
          "algorithm": "HS256",
          "expiresIn": jwtExpiryDays
        });
        return token;
      }catch(e){
        throw e;
      }
    }

    schema.statics.decodeStreamToken = async function(token){
      try{
        return await jwt.verify(token, jwtKey);
      }catch(e){
        console.log("Invalid Token");
      }
    };

    try{
      mongoose.model("stream", schema);
    }catch(e){

    }
  }

  getInstance(){
    this.initSchema();
    return mongoose.model("stream");
  }

}

module.exports = { Stream };