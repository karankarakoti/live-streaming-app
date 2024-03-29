const autoBind = require("auto-bind");
const bcrypt = require("bcrypt");

const { AuthService } = require("../services/AuthService");
const { Auth } = require("../models/Auth");
const { User } = require("../models/User");

const SALT_WORK_FACTOR = 10;
 
const authService = new AuthService(
  new Auth().getInstance(),
  new User().getInstance()
);

class AuthController{
  constructor(service){
    this.service = service;
    autoBind(this);
  }

  async login(req, res, next){
    try{      
      const response = await this.service.login(req.body.email, req.body.password);
      await res.status(response.statusCode).json(response);           
    }catch(e){
      next(e)
    }
  }

  async register(req, res, next){
    try{            
      const registeredUserData = await this.service.register(req.body);
      await res.status(200).json(registeredUserData);      
    }catch(e){
      next(e);
    }
  }

  async updateUserStatus(req, res, next){
    try{            
      const { id } = req.params;
      const user = await this.service.updateUserStatus(id);
      await res.status(200).json(user);      
    }catch(e){
      next(e);
    }
  }

  async changePassword(req, res, next){
    try{
      const id = req.user._id;
      bcrypt.genSalt(SALT_WORK_FACTOR, async(err, salt) => {
        if(err){
          return next(err);
        }
        bcrypt.hash(req.body.password, salt, async(hashErr, hash) => {
          if(hashErr){
            return next(hashErr);
          }
          const data = {"password": hash};
          const response = await this.service.changePassword(id, data);
          await res.status(response.statusCode).json(response);
        });
      });
    }catch(e){
      next(e)
    }
  }

  async logout(req, res, next){
    try{
      const response = await this.service.logout(req.token);
      await res.status(response.statusCode).json(response);
    }catch(e){
      next(e);
    }
  }

  async checkLogin(req, res, next){
    try{
      const token = await this.extractToken(req);
      req.user = await this.service.checkLogin(token);
      req.authorized = true;
      req.token = token;
      next();
    }catch(e){
      next(e);
    }
  }

  async checkUserRole(req, res, next){
    try{      
      const token = await this.extractToken(req);
      req.user = await this.service.checkLogin(token);
      if(req.user.role === "admin"){
        req.authorized = true;
        req.token = token;          
        next();
      }else{
        const error = new Error("Authorization Required");
        error.statusCode = 401;
        next(error);
      }                                  
    }catch(e){
      next(e);
    }                
  }

  async checkUserRoleAtRegistration(req, res, next){
    try{
      if(req.body.role === "user"){
        next()
      }else{
        const token = await this.extractToken(req);
        req.user = await this.service.checkLogin(token);
        if(req.user.role === "admin"){
          req.authorized = true;
          req.token = token;          
          next();
        }else{
          const error = new Error("Authorization Required");
          error.statusCode = 401;
          next(error);
        }                        
      }      
    }catch(e){
      next(e);
    }                
  }

  extractToken(req){
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
      return req.headers.authorization.split(" ")[1];
    }else if(req.query && req.query.token){
      return req.query.token;
    }
    return null;
  }
}

module.exports = new AuthController(authService);