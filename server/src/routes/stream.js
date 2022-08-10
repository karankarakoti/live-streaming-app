const express = require("express");
const AuthController = require("../controllers/AuthController");
const StreamController = require("../controllers/StreamController");

const router = express.Router();

router.post("/", AuthController.checkLogin, StreamController.checkUserRole, StreamController.createStream);
router.get("/live", StreamController.getLiveStreams);
router.get("/user", AuthController.checkLogin, StreamController.checkUserRole, StreamController.getUserStreams);
router.put("/:id", AuthController.checkLogin, StreamController.checkUserRole, StreamController.update);
router.delete("/:id", AuthController.checkLogin, StreamController.checkUserRole, StreamController.delete);
router.get("/create-token/:streamId", AuthController.checkLogin, StreamController.checkUserRole, StreamController.verifyUser, StreamController.createStreamToken);
router.get("/start", StreamController.checkStreamToken, StreamController.checkUserRole, StreamController.startStream);
router.get("/stop", StreamController.checkStreamToken, StreamController.checkUserRole, StreamController.stopStream);

module.exports = router;