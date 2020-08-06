process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Channel = mongoose.model("channels");
const Message = mongoose.model("messages");

describe("Message Routes", function () {
  var agent = request.agent(app);
  before(function (done) {
    this.userId = 'testId';
    this.channelId = '2';

    agent
      .post("/api/signup")
      .send({ email: "defaultUser1@test.com", password: "1234" })
      .end((err, res) => {
        User.updateOne(
          { email: "defaultUser1@test.com" },
          { userId: this.userId }   
        );
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


  it('create new channels', function (done) {
    agent
      .post('/api/message/createChannel')
      .send({
        channelName: 'test',
        accessUsers: 'all'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        
        Channel.findOne({}, (err, channel) => {
          expect(channel.channelName).to.equal('test');

          Channel.update(
            { channelName: 'test' },
            { channelId: this.channelId }
          , (err, afftected, resp) => {
            done();
          });
        });
      });
  });

  it('posts new messages', function (done) {
    agent
      .post('/api/message/post')
      .send({
        channelId: this.channelId,
        userId: this.userId,
        context: 'test message',
        timestamp: Date.now()
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        
        Message.findOne({ userId: this.userId }, (err, message) => {
          expect(message.context).to.equal('test message');
          done();
        });
      });
  });

  it('gets messages', function (done) {
    agent
      .get('/api/message/all')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].messages[0].context).to.equal('test message');
        done();        
      });
  });

});
