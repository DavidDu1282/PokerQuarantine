module.exports = (req, res, next) => {
  //if user is regular user, then send 400 status
  if (req.user.role == 0) {
    res.sendStatus(400);
  }
  next();
};
