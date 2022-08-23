const express = require("express");
const AuthController = require("../controllers/AuthController");
const StreamController = require("../controllers/StreamController");
const UserController = require("../controllers/UserController");
const { upload } = require("../../system/middleware");

const router = express.Router();

router.post("/", AuthController.checkLogin, StreamController.checkUserRole, upload.single("thumbnail"), StreamController.createStream);
router.get("/live", StreamController.getLiveStreams);
router.get("/stream/:key", StreamController.getStreamInfo);
router.get("/user", AuthController.checkLogin, StreamController.checkUserRole, StreamController.getUserStreams);
router.put("/:id", AuthController.checkLogin, StreamController.checkUserRole, upload.single("thumbnail"), StreamController.updateStream);
router.delete("/:id", AuthController.checkLogin, StreamController.checkUserRole, StreamController.delete);
router.get("/create-token/:streamId", AuthController.checkLogin, StreamController.checkUserRole, StreamController.verifyUser, StreamController.createStreamToken);
router.get("/start", StreamController.checkStreamToken, StreamController.checkUserRole, StreamController.startStream);
router.get("/stop", StreamController.checkStreamToken, StreamController.checkUserRole, StreamController.stopStream);
router.get("/broadcaster", UserController.getBroadcasters);
module.exports = router;