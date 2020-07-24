const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
var router = express.Router();

/**
 * Routes that configures user infos
 */

router.post("/avatar", async (req, res) => {
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

  if (typeof img.data != typeof []) {
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

  await cloudinary.uploader.upload(
    imgPath,
    {
      folder: "pokerQuarantine/avatars",
      public_id: id,
      resource_type: "auto",
    },
    async (err, result) => {
      if (err) {
        res.sendStatus(503);
        return;
      }

      // update user avatar in db

      await User.updateOne({ userId: id }, { avatar_url: result.url }).exec(
        (err, user) => {
          if (err) res.sendStatus(503);
          return;
        }
      );

      // return new url for client
      res.status(201);
      res.send(result.url);
    }
  );

  // clear cache

  fs.unlink(imgPath, (err) => {
    if (err) throw err;
  });
});

router.post("/delete", async (req, res) => {
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

  await User.deleteOne({ userId: id }).exec((err, deleteResult) => {
    if (deleteResult.deletedCount === 0) {
      res.sendStatus(400);

      return;
    }
  });

  // delete user avatar
  await cloudinary.uploader.destroy("pokerQuarantine/avatars/" + id);
  res.sendStatus(201);
});

// helper functions

async function writeImg(imgName, imgData) {
  // writes img buffer to .cache
  // return img path

  try {
    fs.mkdirSync(".cache", { recursive: true });
  } catch (err) {
    console.log(err);
  }
  var imgPath = ".cache/" + `${imgName}.png`;

  fs.appendFile(imgPath, imgData, (err) => {
    if (err) throw err;
  });

  return imgPath;
}

//Change password
router.post("/change_password", (req, res) => {
  const { currPassword, newPassword } = req.body;

  User.findOne({ userId: req.user.userId }).then((user) => {
    if (!user) {
      res.sendStatus(400);
      return;
    }
    bcrypt.compare(currPassword, user.password, (err, isMatch) => {
      if (err) {
        res.sendStatus(400);
        return;
      }
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) res.send(400);
            User.findByIdAndUpdate(
              { _id: req.user._id },
              { password: hash },
              (err, result) => {
                if (err) {
                  res.sendStatus(400);
                  return;
                } else {
                  res.sendStatus(200);
                  return;
                }
              }
            );
          });
        });
      } else {
        res.sendStatus(400);
        return;
      }
    });
  });
});

//Change email
router.post("/change_email", async (req, res) => {
  const { newEmail } = req.body;

  try {
    await User.findOneAndUpdate(
      { userId: req.user.userId },
      { email: newEmail },
      (err, result) => {
        if (err) return res.sendStatus(400);
        else {
          return res.sendStatus(200);
        }
      }
    );
  } catch (err) {
    return res.sendStatus(400);
  }
});
module.exports = router;
