process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const { v4: uuidv4 } = require("uuid");

describe("User Routes", () => {
  const agent = request.agent(app);

  before(async function () {
    this.userId = uuidv4();

    var testUser = new User({
      userId: this.userId,
      name: "userConfig.test",
      email: "test@userRoute.test.js",
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

  it("increment win", function (done) {
    agent
      .post("/api/update/win")
      .send({
        id: this.userId,
      })
      .end(async (err, res) => {
        let user_in_db = await User.findOne({
          email: "test@userRoute.test.js",
        }).exec();

        expect(user_in_db.wins).to.equal(1);
        expect(user_in_db.games_played).to.equal(1);

        done();
      });
  });
  it("increment lose", function (done) {
    agent
      .post("/api/update/lose")
      .send({
        id: this.userId,
      })
      .end(async (err, res) => {
        try {
          let user_in_db = await User.findOne({
            email: "test@userRoute.test.js",
          }).exec();

          expect(user_in_db.loses).to.equal(1);
          expect(user_in_db.games_played).to.equal(2);
          done();
        } catch (err) {
          done();
        }
      });
  });
  it("gain balance by 50", function (done) {
    agent
      .post("/api/update/chips/gain/50")
      .send({
        id: this.userId,
      })
      .end(async (err, res) => {
        try {
          let user_in_db = await User.findOne({
            email: "test@userRoute.test.js",
          }).exec();

          expect(user_in_db.balance).to.equal(50);

          done();
        } catch (err) {
          done();
        }
      });
  });
  it("loss balance by 50", function (done) {
    agent
      .post("/api/update/chips/loss/50")
      .send({
        id: this.userId,
      })
      .end(async (err, res) => {
        try {
          let user_in_db = await User.findOne({
            email: "test@userRoute.test.js",
          }).exec();
          console.log(user_in_db);
          expect(user_in_db.balance).to.equal(0);

          done();
        } catch (err) {
          done();
        }
      });
  });
});
