process.env.NODE_ENV = "test";

const { expect } = require("chai");
const app = require("../app");
const req = require("supertest")(app);
const mongoose = require("mongoose");
const { topics, users, articles, comments } = require("../seed/testData");
const seedDB = require("../seed/seed");

describe("/api", () => {
  let articleDocs, topicDocs, commentDocs, userDocs;
  //beforeEach will re-seed the datbase before we begin testing
  beforeEach(() => {
    return seedDB(topics, users, articles, comments).then(docs => {
      [topicDocs, userDocs, articleDocs, commentDocs] = docs;
      // console.log(articleDocs);
    });
  });
  after(() => {
    return mongoose.disconnect();
  });

  // Topics tests
  describe("/topics", () => {
    it("Get returns a status 200 and an array of topics", () => {
      return req
        .get("/api/topics")
        .expect(200)
        .then(res => {
          // console.log(res.body);
          expect(res.body).to.have.all.keys("topics");
          expect(Array.isArray(res.body.topics)).to.be.true;
          expect(res.body.topics[0]).to.be.an("object");
        });
    });
    it("Get returns a status of 200 and all articles by slug related to mitch", () => {
      return req
        .get("/api/topics/mitch/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics[0].belongs_to).to.equal("mitch");
        });
    });

    it("Post returns a status of 201 and creates a new article by slug", () => {
      const article = {
        votes: 0,
        title: "Living in the shadow of a snow man",
        created_by: "5bd2e026ec5be38840336888",
        body: "I find this existence not very challenging",
        belongs_to: "mitch"
      };
      return req
        .post("/api/topics/mitch/articles")
        .send(article)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
        });
    });
    it("Get returns a status of 200 and all articles by slug related to cats", () => {
      return req
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics[0].belongs_to).to.equal("cats");
        });
    });
  });
  describe("status 404", () => {
    it("returns a status of 404 when passed an invalid slug", () => {
      return req
        .get("/api/topics/bob/articles")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
  });
  // articles testing block
  describe("/articles", () => {
    it("Get returns a status of 200 and an array of articles", () => {
      return req
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body).to.be.an("object");
          expect(res.body.article[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.article[0].created_by.name).to.equal("jonny");
        });
    });
    it("Get returns a status of 200 and a single article", () => {
      // I use the articleDocs here so that I can gain access to the ._id
      return req
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body).to.be.an("object");
          expect(res.body.article._id).to.equal(`${articleDocs[0]._id}`);
        });
    });
  });
  // comments testing
  describe("/comments", () => {
    it("Get returns a status of 200 and returns all comments ", () => {
      return req
        .get("/api/comments")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("comments");
          expect(res.body).to.be.an("object");
        });
    });
  });
  describe("/users", () => {
    it("Get returns a status of 200 and returns all users", () => {
      return req
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("users");
          expect(res.body).to.be.an("object");
          expect(res.body.users[0].username).to.equal("butter_bridge");
          expect(res.body.users[1].username).to.equal("dedekind561");
          expect(res.body.users[1].avatar_url).to.equal(
            "https://carboncostume.com/wordpress/wp-content/uploads/2017/10/dale-chipanddalerescuerangers.jpg"
          );
        });
    });
  });
});
