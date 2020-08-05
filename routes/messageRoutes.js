const mongoose = require("mongoose");
const Message = mongoose.model("messages");
const Channel = mongoose.model("channels");
const { v4: uuidv4 } = require("uuid");
var express = require('express');
var router = express.Router();

router.get('/all', async (req, res) => {

  /**
   * GET messages user have access to
   * ----------
   *
   * resCode:
   *  200 OK (w/ data)
   *  404 no user
   *
   * res:
   *  200 res.body: {
   *  msgs
   * }
   *  404 void
   */
  
  if (!req.user) { res.sendStatus(403); return; }
  const channels = await Channel.find({ accessUsers: { $in: [req.user.userId, req.user.role.toString(), 'all'] } }).exec();

  if (channels.length === 0) {
    res.sendStatus(404);
    return;
  }

  var data = await Promise.all(channels.map(async (channel) => {
    let messages = await Message.find({ messageId: { $in: channel.messages} }).exec();
    let channel_ = Object.assign({}, channel._doc);
    channel_.messages = messages;
    return channel_;
  }));

  res.status(200);
  res.send(data);
});

router.post('/post', async (req, res) => {

  /**
   * POST message to DB
   * ----------
   * params:
   *  message
   *
   * resCode:
   *  201 OK (w/ id)
   *  400 invalid message
   *
   */

  try {
    const { userId, channelId, context, timestamp } = req.body;

    let id = uuidv4();

    const message = new Message({
      messageId: id,
      userId: userId,
      channelId: channelId,
      context: context,
      timestamp: timestamp
    });

    message.save();
    await Channel.update(
      { channelId: channelId },
      { $push: { messages: id } },
    ).exec();

    res.status(201);
    res.send(id);
  } catch (e) {
    res.statusMessage = 'invalid message format';
    res.sendStatus(400);
  }

});


router.post('/createChannel', async (req, res) => {

  /**
   * POST new channel to DB
   * ----------
   * params:
   *  channelName
   *  accessUsers
   *
   * resCode:
   *  201 OK (w/ id)
   *  400 invalid format
   *
   */

  try {
    const { channelName, accessUsers } = req.body;

    var id = uuidv4();
    
    const channel = new Channel({
      channelId: id,
      channelName: channelName,
      accessUsers: accessUsers,
      messages: []
    });

    channel.save();

    res.status(201);
    res.send(id);
  } catch (e) {
    res.statusMessage = 'invalid channel format';
    res.sendStatus(400);
  }

});

module.exports = router;