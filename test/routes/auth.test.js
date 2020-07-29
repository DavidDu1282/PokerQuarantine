process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");
const { resource } = require("../../app");

describe("Auth Routes", () => {
  var agent = request.agent(app);
  before((done) => {
    agent
      .post("/api/signup")
      .send({ email: "defaultUser1@test.com", password: "1234" })
      .end((err, res) => {
        done();
      });
  });
  beforeEach(function (done) {
    agent
      .post("/api/login") // revised
      .send({ email: "defaultUser1@test.com", password: "1234" })
      .end((err, res) => {
        done();
      });
  });

  it("should successfully change passwords on /api/change_password POST", (done) => {
    const currPassword = "1234";
    const newPassword = "4321";
    agent
      .post("/api/config/change_password")
      .send({ currPassword: currPassword, newPassword: newPassword })
      .end((err, res) => {
        if (err) done(err);

        User.findOne({ email: "defaultUser1@test.com" }).then((user) => {
          bcrypt.compare(currPassword, user.password, (err, isMatch) => {
            expect(isMatch).to.equal(false);
          });
        });

        User.findOne({ email: "defaultUser1@test.com" }).then((user) => {
          bcrypt.compare(newPassword, user.password, (err, isMatch) => {
            expect(isMatch).to.equal(true);
          });
        });

        expect(res.status).to.equal(200);

        done();
      });
  });

  it("should successfully change email on /api/change_email POST", (done) => {
    const oldEmail = "defaultUser1@test.com";
    agent
      .post("/api/config/change_email")
      .send({ newEmail: "newEmail@live.ca" })
      .end((err, res) => {
        if (err) done(err);
        User.findOne({ email: oldEmail }).then((user) =>
          expect(user).to.equal(null)
        );
        User.findOne({ email: "newEmail@live.ca" }).then((user) => {
          expect(user).to.not.be.equal(undefined);
          expect(user.email).to.not.be.equal(oldEmail);
        });
        done();
      });
  });

  ///
});
