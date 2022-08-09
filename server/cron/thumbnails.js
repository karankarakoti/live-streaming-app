const axios = require("axios");
const CronJob = require("cron").CronJob;
const config = require("../config/config").getConfig().RTMP_SERVER;
const helpers = require("../helpers");

const job = new CronJob("*/5 * * * * *", function(){
  axios.get("http://127.0.0.1:" + config.http.port + "/api/streams")
    .then(response => {
      let streams = response.data;
      if(typeof(streams["live"] !== undefined)){
        let live_streams = streams["live"];
        for(let stream in live_streams){
          if(!live_streams.hasOwnProperty(stream)) continue;
          helpers.generateStreamThumbnail(stream);
        }
      }
    }).catch(error => {
      console.log(error);
    }
  )
}, null, true);

module.exports = job;