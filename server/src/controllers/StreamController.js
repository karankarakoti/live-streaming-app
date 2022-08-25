const autoBind = require("auto-bind");
const shortid = require("shortid");
const { io } = require("../../config/socket");

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

  async createStream(req, res){
    req.body.createdBy = req.user._id;
    req.body.streamKey = shortid();
    if(req.file?.filename){
      const filename = req.file?.filename;
      req.body.streamThumbnail = filename;
    }
    const stream = await this.service.insert(req.body);
    res.status(201).json(stream);
  }

  async updateStream(req, res){    
    if(req.file?.filename){
      const filename = req.file?.filename;
      req.body.streamThumbnail = filename;
    }    
    const stream = await this.service.update(req.body._id, req.body);
    res.status(200).json(stream);
  }

  async getLiveStreams(req, res){
    const liveStreams = await this.service.getLiveStreams();
    const securedStreams = await this.service.getSecuredStreams();
    const streams = [...liveStreams, ...securedStreams];
    await res.status(200).json(streams);      
  }

  async getUserStreams(req, res){
    const streams = await this.service.getUserStreams(req.user._id)    
    await res.status(200).json(streams);      
  }

  async getStreamInfo(req, res){
    const { key } = req.params;
    const stream = await this.service.getStreamInfo(key)
    await res.status(200).json(stream);      
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
    const _stream = data.stream;
    _stream.isStreamingNow = true;
    io.emit("New Livestream", _stream);
    res.status(200).json(isUpdated);
  }

  async stopStream(req, res){
    const data = {
      user: req.user,
      stream: req.body.stream
    }
    const updateData = {
      "isStreamingNow": false,
      // "isStreamFinish": true
    }
    const isUpdated = await this.service.update(data.stream._id, updateData);    
    io.emit("Livestream Finish", data.stream._id);
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
        }else{
          const error = new Error("Invalid Token");
          error.statusCode = 401;
          next(error);
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
        if(req.user._id === String(stream.createdBy._id)){
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