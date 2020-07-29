process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const { v4: uuidv4 } = require("uuid");

describe("Leaderboard Routes", function () {
  const agent = request.agent(app);

  beforeEach(async function () {
    // setup a new account in db
    this.userId = uuidv4();

    var testUser = new User({
      userId: this.userId,
      name: "leaderboard.test",
      email: "test@leaderboard.test.js",
      password: "1",

      dob: Date.now(),
      role: 0,
      balance: 0,
      games_played: 0,
      wins: 0,
      losses: 0,

      avatar_url: "",
    });

    await testUser.save();
  });

  afterEach(async function () {
    // delete the account
    await User.deleteOne({ email: "test@leaderboard.test.js" }).exec();
  });

  it("get top 10 users", function (done) {
    agent
      .get("/api/top10")

      .end((err, res) => {
        console.log(res);
        if (err) done(err);
        done();
      });
  });

  after(async () => {
    // delete in-case test failed
    await User.deleteOne({ email: "test@leaderboard.test.js" }).exec();
  });
});
