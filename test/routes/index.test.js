process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { v4: uuidv4 } = require('uuid');

describe('Index Routes', function() {
  const agent = request.agent(app);

  before(async function() {
    this.userId = uuidv4();

    var testUser = new User({
      userId: this.userId,
      name: 'index.test',
      email: 'test@index.test.js',
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
  })

  it('gets the user', function (done) {
    agent
      .get(`/users/${this.userId}`)
      .end((err, res) => {
        expect(res.body.name).to.be.equal('index.test');

        done(); 
      })
  })


  after(async () => {
    await User.deleteOne({email: 'test@index.test.js'}).exec();
  })
});