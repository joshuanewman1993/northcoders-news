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
          expect(res.body).to.have.all.keys("topics");
          expect(Array.isArray(res.body.topics)).to.be.true;
          expect(res.body.topics[0]).to.be.an("object");
          expect(res.body).to.not.be.a("string");
          expect(res.body).to.not.be.an("array");
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics.length).to.not.equal(123);
          expect(res.body.topics[0]).to.have.keys(
            "_id",
            "title",
            "slug",
            "__v"
          );
          expect(res.body.topics[0]).to.not.have.keys(
            "id",
            "list",
            "snail",
            "v__v"
          );
        });
    });

    it("Get returns a status of 200 and all articles by slug related to mitch", () => {
      return req
        .get("/api/topics/mitch/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics[0].belongs_to).to.equal("mitch");
          expect(res.body.topics.length).to.equal(2);
        });
    });
    it("Get returns a status of 200 and all articles by slug related to cats", () => {
      return req
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics[1].belongs_to).to.equal("cats");
          expect(res.body.topics.length).to.equal(2);
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
  });

  // 404 testing block
  describe("status 404", () => {
    it("returns a status of 404 when passed an invalid /article link", () => {
      return req
        .get("/api/article")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an invalid /comment link", () => {
      return req
        .get("/api/comment")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an invalid /user link", () => {
      return req
        .get("/api/user")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an invalid /topic link", () => {
      return req
        .get("/api/user")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an invalid slug", () => {
      return req
        .get("/api/topics/bob/articles")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an invalid article id", () => {
      return req
        .get("/api/articles/5bd31e1bc113b7adf623e2b8")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an comment id", () => {
      return req
        .get("/api/comments/6bd5f6806f11fb430b789ff4")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
        });
    });
    it("returns a status of 404 when passed an invalid username", () => {
      return req
        .get("/api/users/venom")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
          expect(res.body).to.not.equal({ msg: "You made a bad request" });
          expect(res.body).to.not.be.an("array");
        });
    });
  });

  // articles testing block
  describe.only("/articles", () => {
    it("Get returns a status of 200 and an array of articles", () => {
      return req
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("articles");
          expect(res.body).to.be.an("object");
          expect(res.body.articles[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[0].comment_count).to.equal(2);
          expect(res.body.articles[0]).to.have.all.keys(
            "_id",
            "votes",
            "title",
            "created_by",
            "body",
            "created_at",
            "belongs_to",
            "__v",
            "comment_count"
          );
          expect(res.body.articles[0]).to.not.have.all.keys(
            "id",
            "voting",
            "title",
            "created",
            "statue",
            "created_at_date",
            "does_not_belongs_to",
            "v__v",
            "commenting_counter"
          );
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[0].comment_count).to.equal(2);
          expect(res.body.articles[0].comment_count).to.not.equal(304);
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
  it("Get returns a status of 200 and displays all comments on an article", () => {
    // console.log(articleDocs[0]._id); // we use articleDocs and the array [0] element to access the array
    // then get the id
    return req
      .get(`/api/articles/${articleDocs[0]._id}/comments`)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.all.keys("comments");
        expect(res.body.comments).to.be.an("array");
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
          console.log(res.body.comments[0].created_by.username);
          expect(res.body.comments[0].created_by.username).to.eql(
            "dedekind561"
          );
          expect(res.body.comments[0].created_by.name).to.eql("mitch");
          expect(res.body.comments.length).to.equal(8);
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
          expect(res.body.users.length).to.equal(2);
        });
    });
    it("Get returns a status of 200 and returns a single username", () => {
      return req
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("user");
          expect(res.body.user.username).to.eql("butter_bridge");
          expect(res.body).to.be.an("object");
        });
    });
  });
});
