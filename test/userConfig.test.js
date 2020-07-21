process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const e = require("express");
const User = mongoose.model("users");
const fs = require("fs");

const test_img = fs.readFile('../client/public/logo.png', (err, data) => {
  return;
});

describe('UserConfig Routes: avatar', () => {
  var agent = request.agent(app);

  beforeEach(async () => {
    // setup a new account in db
    var testUser = new User({
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
  
  afterEach(async () => {
    // delete the account
    await User.deleteOne({email: 'test@userConfig.test.js'}, (err) => {
      console.log(err);
    })
  });

  it('uploads the avatar without error', (done) => {
    agent
      .post('/api/config/avatar')
      .send({
        email: 'test@userConfig.test.js',
        img: test_img,
      })
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });

  it('uploads the avatar succesfully', (done) => {
    agent
      .post('/api/config/avatar')
      .send({
        email: 'test@userConfig.test.js',
        img: test_img,
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res.body.data).to.include('.png');
        done();
      });
  });

  it('replaces user avatar in the database', (done) => {
    agent
      .post('/api/config/avatar')
      .send({
        email: 'test@userConfig.test.js',
        img: test_img,
      })
      .end(async (err, res) => {
        if (err) done(err);

        let user = await User.findOne({email: 'test@userConfig.test.js'}).exec();
        expect(res.body.data).to.equal(user.avatar_url);

        done();
      });
  });
});