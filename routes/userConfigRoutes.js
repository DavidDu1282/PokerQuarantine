const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const path = require("path");

const fs = require('fs');
const cloudinary = require('cloudinary').v2;
var router = express.Router();

/**
 * Routes that configures user infos
 */

router.post('/avatar', (req, res) => {
  /**
   * updates the avatar for the selected user
   * ----------
   * params: 
   *  id: str
   *  img: img/webp
   * 
   * resCode:
   *  201 OK (w/ data)
   *  400 Invalid data format
   *  503 Image server connection error
   * 
   * res: 
   *  200 res.text: img_url
   *  400/503 void
   */

  const { id, img } = req.body;
  
  // save img to cache
  var imgPath;
  // console.log(img.data);

  try {
    imgPath = writeImg(id, Buffer.from(img.data));
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
    return;
  }

  // upload img
  
  cloudinary.uploader.upload(imgPath, {
    folder: 'pokerQuarantine/avatars',
    public_id: id,
    resource_type: 'auto'
  }, async (err, result) => {
    
    if (err) {
      res.sendStatus(503);
      return;
    }

    // update user avatar in db

    await User.updateOne(
      { userId: id },
      { avatar_url: result.url }
    ).exec((err, user) => {
      if (err) res.sendStatus(503);
      return;
    });

    // return new url for client
    res.status(201);
    res.send(result.url);
  
  });

  // clear cache
  
  fs.unlink(imgPath, (err) => {
    if (err) throw err;
  });
  
});


// helper functions

function writeImg(imgName, imgData) {
  // writes img to .cache
  // return img path

  fs.mkdirSync('.cache', { recursive: true }); 
  var imgPath = '.cache/' + `${imgName}.png`;

  fs.appendFile(imgPath, imgData, (err) => {
    if (err) throw err;
  })

  return imgPath;
}

module.exports = router;