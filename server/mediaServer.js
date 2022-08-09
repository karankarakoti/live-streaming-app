const axios = require("axios");
const NodeMediaServer = require("node-media-server");
const config = require("./config/config").getConfig();
const helpers = require("./helpers");

nms = new NodeMediaServer(config.RTMP_SERVER);

nms.on("prePublish", async(id, streamPath, args) => {  
  let streamKey = getKeyFromPath(streamPath);
  let session = nms.getSession(id);  
  if(args.token){          
    let response;
    await axios.get(`${config.API_URL}api/streams/start`, {
      headers: {
        Authorization: "Bearer " + args.token
      }
    }).then(async resp => {
      response = await resp.data;
      if(response?.statusCode === 200){
        helpers.generateStreamThumbnail(streamKey);
      }else{
        session.reject()
      }
    }).catch(error => {
      session.reject()
      console.log(error)
    });    
  }else{
    session.reject();
  }  
});

nms.on('donePublish', async(id, StreamPath, args) => {
  if(args.token){          
    let response;
    await axios.get(`${config.API_URL}api/streams/stop`, {
      headers: {
        Authorization: "Bearer " + args.token
      }
    }).then(async resp => {
      response = await resp.data;
    }).catch(error => {
      console.log(error)
    });
    if(response.statusCode === 200){
      //helpers.generateStreamThumbnail(streamKey);
    }
  }else{
    const error = "Invalid Token";
    error.statusCode = 401;
    throw error;
  }  
});


const getKeyFromPath = (path) => {
  let parts = path.split("/");  
  return parts[parts.length-1]
}

module.exports = nms;