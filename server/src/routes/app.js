"use strict";
const express = require("express");
const { upload } = require("../../system/middleware");
const router = express.Router();

router.get("/app", (req, res)=>{ res.status(200).json({ route: "app" })});
router.post(
  "/upload",
  upload.single("image"),
  (req, res) => { 
    if(req.file?.filename){
      const filename = req.file?.filename;
      return res.status(200).json({
        message: `${filename} Uploaded Successfully`
      });
    }else{
      return res.status(400).json({
        message: `No File Provided`
      });
    }
});

module.exports = router;