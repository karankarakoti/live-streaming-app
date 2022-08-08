"use strict";
const express = require("express");
const router = express.Router();

router.get("/app", (req, res)=>{ res.status(200).json({ route: "app" })});

module.exports = router;