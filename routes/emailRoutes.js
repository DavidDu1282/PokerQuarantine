/*
const nodemailer = require('nodemailer');
const creds = require('./../../config');
const express = require("express");
var router = express.Router();
const port = process.env.PORT || 5000;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: creds.USER,
    pass: creds.PASS // naturally, replace both with your real credentials or an application-specific password
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

router.use(express.json());
router.post('/sendEmail', (req, res, next) => {
  console.log("attempting to send email");
  const name = req.body.name
  const email = req.body.email
  const message = req.body.messageHtml

  console.log("attempting to send email");
  const mailOptions = {
    from: creds.USER,
    to: email,
    subject: 'Your Friend Invites you to play PokerQuarantine!',
    text: message
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})
module.exports = router;
*/
