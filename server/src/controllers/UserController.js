const autoBind = require("auto-bind");
const { Controller } = require("../../system/controllers");
const { User } = require("../models/User");
const { UserService } = require("../services/UserService");

const userService = new UserService(
  new User().getInstance()
);

class UserController extends Controller{
  constructor(service){
    super(service);
    this.service = service;
    autoBind(this);
  }

  async getBroadcasters(req, res){
    const broadcasters = await this.service.getBroadcasters();    
    await res.status(200).json(broadcasters);      
  }

}

module.exports = new UserController(userService)