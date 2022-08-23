"use strict";
const path = require("path");

module.exports.getConfig = () => {
  const config = {
    "NODE_ENV": process.env.NODE_ENV,
    "PORT": process.env.PORT,    
    "MONGO_URL": process.env.MONGO_URL,
    "MONGO_USER": process.env.MONGO_USER,
    "MONGO_PASSWORD": process.env.MONGO_PASSWORD,
    "MONGO_DB_NAME": process.env.MONGO_DB_NAME,    
    "JWT_SECRET": process.env.JWT_SECRET,
    "API_URL": process.env.API_URL,
    "MAIL_HOST": process.env.MAIL_HOST,
    "MAIL_PORT": process.env.MAIL_PORT,
    "MAIL_USER": process.env.MAIL_USER,
    "MAIL_PASS": process.env.MAIL_PASS,
    "UPLOAD_PATH": path.resolve( `${__dirname }/../public`),
    "RTMP_SERVER": {
      rtmp: {
        port: process.env.RTMP_MS_PORT,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
      },
      http: {
        port: process.env.RTMP_HTTP_PORT,
        mediaroot: process.env.RTMP_HTTP_MEDIA_ROOT,
        allow_origin: "*"
      },
      trans: {
        ffmpeg: process.env.RTMP_FFMPEG_LOCATION_WIN,
        tasks: [
          {
            app: "live",
            hls: true,
            hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
            dash: true,
            dashFlags: "[f=dash:window_size=3:extra_window_size=5]"
          }
        ]
      },
      auth: {
        api: false,
        api_user: process.env.RTMP_HTTP_USER,
        api_pass: process.env.RTMP_HTTP_PASSWORD,
      }
    },    
  }

  return config
};