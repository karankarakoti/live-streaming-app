"use strict";

const autoBind = require("auto-bind");
const { HttpResponse } = require("../../system/helpers/HttpResponse");
const { Service } = require("../../system/services");

class StreamService extends Service{
  constructor(model){
    super(model);
    this.model = model;    
    autoBind(this);
  }
  
  async find(streamId){
    const stream = await this.model.findById(streamId);
    return stream
  }

  async getLiveStreams(){
    const streams = await this.model.find({isStreamingNow: true})
    return streams
  }

  async getUserStreams(userId){
    const streams = await this.model.find({createdBy: userId}).select("+accessibleTo")
    return streams
  }

  async createStreamToken(data){
    const token = await this.model.generateStreamToken(data);
    return token;
  }

}

module.exports = { StreamService };