const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const cloudinary = require('cloudinary').v2;
var router = express.Router();

/**
 * Routes that configures user infos
 */

router.post("/avatar", (req, res) => {
  /**
   * updates the avatar for the selected user
   * ----------
   * params: 
   *  email: str
   *  img: img/webp
   * 
   * resCode:
   *  201 OK (w/ data)
   *  400 Invalid data format
   *  503 Image server connection error
   * 
   * res: 
   *  200 img_url
   *  400/503 null
   */

  // upload img

  // update user avatar in db

  // return new url for client

  res.sendStatus(201);
});

module.exports = router;