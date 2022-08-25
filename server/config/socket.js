const http = require("http")
const socketIo = require('socket.io');

const socketServer = http.createServer();
const io = socketIo(socketServer, { cors: { origin: "*"}});
// io.on("connection", socket => {
//   console.log("Connected & ID =", socket.id);
// });

socketServer.listen(4000);

module.exports = { io };