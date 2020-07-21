process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const e = require("express");
const User = mongoose.model("users");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


describe('UserConfig Routes: avatar', function() {
  var agent = request.agent(app);
  const test_img = fs.readFileSync('client/public/logo.png');

  beforeEach(async function() {
    // setup a new account in db
    this.userId = uuidv4();

    var testUser = new User({
      userId: this.userId,
      name: 'userConfig.test',
      email: 'test@userConfig.test.js',
      password: '1',
  
      dob: Date.now(),
      role: 0,
      balance: 0,
      games_played: 0,
      wins: 0,
      losses: 0,
  
      avatar_url: '',
    });
  
    await testUser.save();
  });
  
  afterEach(async function() {
    // delete the account
    await User.deleteOne({email: 'test@userConfig.test.js'}).exec();
  });

  it('uploads the avatar without error', function(done) {
    agent
      .post('/api/config/avatar')
      .send({
        id: this.userId,
        img: test_img,
      })
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });

  it('uploads the avatar succesfully', function(done) {
    agent
      .post('/api/config/avatar')
      .send({
        id: this.userId,
        img: test_img,
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
          done(err);
        }

        expect(res.text).to.include('.png');
        done();
      });
  });

  it('replaces user avatar in the database', function(done) {
    agent
      .post('/api/config/avatar')
      .send({
        id: this.userId,
        img: test_img,
      })
      .end(async (err, res) => {
        if (err) {
          console.log(err);
          done(err);
        }

        let user = await User.findOne({email: 'test@userConfig.test.js'}).exec();
        expect(res.text).to.equal(user.avatar_url);

        done();
      });
  });
});