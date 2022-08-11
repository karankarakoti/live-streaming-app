"use strict";

const autoBind = require("auto-bind");
const { Service } = require("../../system/services");

class StreamService extends Service{
  constructor(model){
    super(model);
    this.model = model;    
    autoBind(this);
  }
  
  async find(streamId){
    const stream = await this.model.findById(streamId).populate("createdBy", "firstName lastName imageUrl");
    return stream
  }

  async getLiveStreams(){
    const streams = await this.model.find({isStreamingNow: true}).populate("createdBy", "firstName lastName imageUrl");
    return streams
  }

  async getSecuredStreams(){
    const streams = await this.model.find({$and: [{isStreamingNow: false }, { isSecuredStream: true}, { isStreamFinish: false}]}).populate("createdBy", "firstName lastName imageUrl");
    return streams
  }

  async getUserStreams(userId){
    const streams = await this.model.find({createdBy: userId}).select("+accessibleTo").populate("createdBy", "firstName lastName imageUrl");
    return streams
  }

  async createStreamToken(data){
    const token = await this.model.generateStreamToken(data);
    return token;
  }

  async decodeStreamToken(token){
    const data = await this.model.decodeStreamToken(token);
    return data;
  }

}

module.exports = { StreamService };