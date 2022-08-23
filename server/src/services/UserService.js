"use strict";

const autoBind = require("auto-bind");
const { Service } = require("../../system/services");

class UserService extends Service{
  constructor(model){
    super(model);
    this.model = model;
    autoBind(this);
  }

  async updatePassword(id, data){
    try{
      await this.model.findByIdAndUpdate(id, data, { "new": true });
      return { "passwordChanged": true };
    }catch(errors){
      throw errors;
    }
  }

  async updateStatus(id){
    try{      
      await this.model.findByIdAndUpdate(
        id,
        [{"$set": {status: {"$not": "$status"}}}],
        { "new": true }
      );
      return { "statusUpdated": true };
    }catch(errors){
      throw errors;
    }
  }

  /**
  *
  * @param email : string
  * @param includePassword : boolean
  * @returns {Promise<*>}
  */

  async findByEmail(email, includePassword=false){
    return includePassword ? this.model.findByEmail(email).select("+password") : this.model.findByEmail(email);
  }

  async getBroadcasters(){
    const broadcasters = await this.model.find({role: "streamer"});
    return broadcasters
  }
}

module.exports = { UserService };