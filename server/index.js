require("dotenv").config();
require("./config/database");

const config = require("./config/config").getConfig();
const NodeMediaServer = require("./mediaServer");
const thumbnail_generator = require("./cron/thumbnails");
const PORT = config.PORT;

console.log("✔ Bootstrapping Application");
console.log(`✔ Mode: ${config.NODE_ENV}`);
console.log(`✔ Port: ${PORT}`);

const { server } = require("./config/server");
const { io } = require("./config/socket");

server.listen(PORT).on("error", (err) => {
  console.log("✘ Application failed to start");
  console.error("✘", err.message);
  process.exit(0);
}).on("listening", () => {
  console.log("✔ Application Started");
});

io.on("connection", socket=>{});

NodeMediaServer.run();
thumbnail_generator.start();

module.exports = { server }