const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const fs = require('fs');
const cloudinary = require('cloudinary').v2;
var router = express.Router();

/**
 * Routes that configures user infos
 */

router.post('/avatar', async (req, res) => {
  /**
   * updates the avatar for the selected user
   * ----------
   * params: 
   *  id: str
   *  img: array str
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
  
  if (typeof(img.data) != typeof([])) {
    res.sendStatus(400);
    return;
  }

  // save img to cache
  var imgPath;
  // console.log(img.data);

  try {
    imgPath = await writeImg(id, Buffer.from(img.data));
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
    return;
  }

  // upload img
  
  await cloudinary.uploader.upload(imgPath, {
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


router.post('/delete', async (req, res) => {
  /**
   * updates the avatar for the selected user
   * ----------
   * params: 
   *  id: str
   * 
   * resCode:
   *  201 OK
   *  400 Invalid user id
   * 
   */

  const { id } = req.body;
  if (id == null) {
    res.sendStatus(400);
    return;
  }

  await User.deleteOne({userId: id}).exec((err, deleteResult) => {
    if (deleteResult.deletedCount === 0) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(201);
  });

  // delete user avatar
  await cloudinary.uploader.destroy('pokerQuarantine/avatars/' + id);

});

// helper functions

async function writeImg(imgName, imgData) {
  // writes img buffer to .cache
  // return img path

  fs.mkdirSync('.cache', { recursive: true }); 
  var imgPath = '.cache/' + `${imgName}.png`;

  fs.appendFile(imgPath, imgData, (err) => {
    if (err) throw err;
  })

  return imgPath;
}

module.exports = router;