process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const NewsPost = mongoose.model("newsposts");

describe("NewsPost Routes", () => {
  it("should list ALL newposts on /api/newspost GET", (done) => {
    request(app)
      .get("/api/newspost")

      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.an("array");

        done();
      });
  });

  it("should add a SINGLE newposts on /api/newspost POST", (done) => {
    request(app)
      .post("/api/newspost")
      .send({ title: "TEST TITLE", body: "TEST BODY" })
      .then(() => {
        return NewsPost.find({ title: "TEST TITLE" });
      })
      .then((res) => {
        expect(res[0]).to.have.property("_id");
        expect(res[0]).to.have.property("title");
        expect(res[0]).to.have.property("body");
        expect(res[0]).to.have.property("date");
        done();
      })
      .catch((err) => done(err));
  });

  it("should list a SINGLE newposts on /api/newspost/:id GET", (done) => {
    var mockData = { title: "TEST query", body: "TEST query BODY" };
    //insert new record to query later
    request(app)
      .post("/api/newspost")
      .send(mockData)
      .then(() => {
        return NewsPost.find({ title: "TEST query" });
      })
      //get the single newposts that was just inserted to mock db
      .then((res) => {
        request(app)
          .get("/api/newspost/" + res[0]._id)

          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body[0].title).to.equal(mockData.title);
            expect(res.body[0].body).to.equal(mockData.body);
            done();
          })
          .catch((err) => done(err));
      });
  });

  it("should delete a SINGLE newposts on /del/newspost/:id DELETE", (done) => {
    var mockData = { title: "TEST DELETE1", body: "TEST DELETE BODY" };
    //insert new record to delete later
    request(app)
      .post("/api/newspost")
      .send(mockData)
      .then(() => {
        return NewsPost.find({ title: "TEST DELETE1" });
      })
      //delete recent inserted record
      .then((res) => {
        request(app)
          .delete("/api/del/newspost/" + res[0]._id)
          .expect(200)
          .end((err, res) => {
            if (err) done(err);
            done();
          });
      });
  });
});
