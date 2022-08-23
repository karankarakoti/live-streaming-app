const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config/config").getConfig();
const jwtKey = config.JWT_SECRET;
const jwtExpiryDays = "365D";

class Auth{
  initSchema(){
    const schema = new Schema({
      "token": {
        "type": String,
        "required": true
      },
      "user": {
        "type": Schema.Types.ObjectId,
        "required": true,
        "ref": "user"
      }
    }, { "timestamps": true });

    schema.statics.generateToken = async function(user){
      try{
        const token = await jwt.sign({
          "_id": user._id.toString(),
          "email": user.email,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "role": user.role
        }, jwtKey, {
          "algorithm": "HS256",
          "expiresIn": jwtExpiryDays
        });
        return token;
      }catch(e){
        throw e;
      }
    };

    schema.statics.decodeToken = async function(token){
      try{
        return await jwt.verify(token, jwtKey);
      }catch(e){
        throw e;
      }
    };

    try{
      mongoose.model("auth", schema);
    }catch(e){
      throw e;
    }

  }

  getInstance(){
    this.initSchema();
    return mongoose.model("auth");
  }
}

module.exports = { Auth };