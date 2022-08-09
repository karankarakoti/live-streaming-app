const autoBind = require("auto-bind");

const { Controller } = require("../../system/controllers")
const { Stream } = require("../models/Stream");
const { StreamService } = require("../services/StreamService");
const AuthController = require("./AuthController");

const streamService = new StreamService(
  new Stream().getInstance()
);

class StreamController extends Controller{
  constructor(service){
    super(service);
    this.service = service;
    autoBind(this);
  }

  async getLiveStreams(req, res){
    const streams = await this.service.getLiveStreams()
    await res.status(200).json(streams);      
  }

  async getUserStreams(req, res){
    const streams = await this.service.getUserStreams(req.user._id)
    await res.status(200).json(streams);      
  }

  async createStreamToken(req, res){
    const data = {
      user: req.user,
      stream: req.body.stream
    }
    const token = await this.service.createStreamToken(data);
    res.status(200).json({token: token});
  }

  async startStream(req, res){
    const data = {
      user: req.user,
      stream: req.body.stream
    }
    const updateData = {
      "isStreamingNow": true
    }
    const isUpdated = await this.service.update(data.stream._id, updateData);    
    res.status(200).json(isUpdated);
  }

  async stopStream(req, res){
    const data = {
      user: req.user,
      stream: req.body.stream
    }
    const updateData = {
      "isStreamingNow": false
    }
    const isUpdated = await this.service.update(data.stream._id, updateData);    
    res.status(200).json(isUpdated);
  }

  async checkStreamToken(req, res, next){
    try{
      const token = AuthController.extractToken(req);      
      if(token){
        const data = await this.service.decodeStreamToken(token);
        if(data){
          req.user = data.user;
          req.body.stream = data.stream;
          next();
        }
      }else{
        const error = new Error("Invalid Token");
        error.statusCode = 401;
        next(error);
      }     
    }catch(e){
      next(e);
    }    
  }

  checkUserRole(req, res, next){
    if(req.user.role === "streamer"){
      req.authorized = true;      
      req.body.streamKey = req.user.streamKey;
      req.body.createdBy = req.user._id;
      next();
    }else{
      const error = new Error("Authorization Required");
      error.statusCode = 401;
      throw error;
    }
  }

  async verifyUser(req, res, next){
    try{
      const { streamId } = req.params      
      const stream = await this.service.find(streamId);          
      if(typeof(stream) === "object"){
        if(req.user._id === String(stream.createdBy)){
          req.body.stream = stream;        
          next()
        }else{
          const error = new Error("Authorization Required");
          error.statusCode = 401;
          next(error)
        }        
      }else{        
        const error = new Error("Stream not found");
        error.statusCode = 401;
        next(error)
      }
    }catch(e){      
      const error = new Error("Stream not found");
      error.statusCode = 401;
      next(error)
    }
  }
}

module.exports = new StreamController(streamService);