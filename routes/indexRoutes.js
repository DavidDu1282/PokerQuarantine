const mongoose = require("mongoose");
const User = mongoose.model("users");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/users/:userId', async (req, res) => {

  /**
   * GET public info of user 
   * ----------
   * params:
   *  userId: str
   *
   * resCode:
   *  200 OK (w/ data)
   *  404 no user
   *
   * res:
   *  200 res.body: {
   *  userId: str,
   *  name: str,
   *  ballance: int, 
   *  role: int,
   *  games_played: int,
   *  wins: int,
   *  losses: int,
   *  avatar_url: str,
   * }
   *  404 void
   */
  const user = await User.findOne({ userId: req.params.userId }).exec();

  if (user == null) {
    res.sendStatus(404);
    return;
  }

  res.status(200);
  res.send({
    userId: user.userId,
    name: user.name,
    ballance: user.ballance, 
    role: user.role,
    games_played: user.games_played,
    wins: user.wins,
    losses: user.losses,
    avatar_url: user.avatar_url
  });

});

module.exports = router;