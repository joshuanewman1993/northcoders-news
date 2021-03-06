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
    it("GET returns a status 200 and an array of topics", () => {
      return req
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(Array.isArray(res.body.topics)).to.be.true;
          expect(res.body.topics[0]).to.be.an("object");
          expect(res.body).to.not.be.a("string");
          expect(res.body).to.not.be.an("array");
          expect(res.body.topics.length).to.equal(topics.length);
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

    it("GET returns a status of 200 and all articles by slug related to mitch", () => {
      return req
        .get("/api/topics/mitch/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics[0].belongs_to).to.equal("mitch");
          expect(res.body.topics.length).to.equal(topics.length);
        });
    });
    it("GET returns a status of 200 and all articles by slug related to cats", () => {
      return req
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("topics");
          expect(res.body.topics[1].belongs_to).to.equal("cats");
          expect(res.body.topics.length).to.equal(topics.length);
        });
    });
    it("POST returns a status of 201 and creates a new article by slug", () => {
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

  // articles testing block
  describe("/articles", () => {
    it("GET returns a status of 200 and an array of articles", () => {
      return req
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("articles");
          expect(res.body).to.be.an("object");
          expect(res.body.articles[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.articles.length).to.equal(articles.length);
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
            //<-- this is probably over-kill
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
          expect(res.body.articles.length).to.equal(articles.length);
          expect(res.body.articles[0].comment_count).to.equal(2);
        });
    });
    it("GET returns a status of 200 and a single article", () => {
      // I use the articleDocs here so that I can gain access to the ._id
      return req
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("article");
          expect(res.body).to.be.an("object");
          expect(res.body.article._id).to.equal(`${articleDocs[0]._id}`);
          expect(res.body.article._id).to.not.equal("Jolly Roger");
        });
    });
    it("Patch returns a status of 200 and increases article votes", () => {
      return req
        .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(articleDocs[0].votes + 1).to.equal(res.body.votes);
        });
    });
    it("PATCH returns a status of 200 and decreases article votes", () => {
      return req
        .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(articleDocs[0].votes - 1).to.equal(res.body.votes);
        });
    });
    it("GET returns a status of 200 and displays all comments on an article", () => {
      // console.log(articleDocs[0]._id); // we use articleDocs and the array [0] element to access the array
      // then get the id
      return req
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("comments");
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments.length).to.equal(2);
        });
    });
  });

  // comments testing
  describe("/comments", () => {
    it("GET returns a status of 200 and returns all comments ", () => {
      return req
        .get("/api/comments")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("comments");
          expect(res.body).to.be.an("object");
          expect(res.body.comments[0].created_by.username).to.eql(
            "dedekind561"
          );
          expect(res.body.comments[0].created_by.name).to.eql("mitch");
          expect(res.body.comments.length).to.equal(comments.length);
          expect(res.body.comments[0].votes).to.equal(comments[0].votes);
        });
    });
    it("PATCH returns a status of 200 and increases the votes ", () => {
      return req
        .patch(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(commentDocs[0].votes + 1).to.equal(res.body.comment.votes);
        });
    });
    it("PATCH returns a status of 200 and decreases the votes ", () => {
      return req
        .patch(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          // console.log(commentDocs[0].votes + 1);
          expect(commentDocs[0].votes - 1).to.equal(res.body.comment.votes);
        });
    });
  });
  describe("/users", () => {
    it("GET returns a status of 200 and returns all users", () => {
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
          expect(res.body.users.length).to.equal(users.length);
        });
    });
    it("GET returns a status of 200 and returns a single username", () => {
      return req
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys("user");
          expect(res.body.user.username).to.eql("butter_bridge");
          expect(res.body).to.be.an("object");
          expect(res.body).to.not.be.an("array");
          expect(res.body.user).to.not.be.a("string");
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
          expect(res.body).to.not.be.an("array");
          expect(res.body).to.not.equal("msg: You made a bad request");
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
    it("returns a status of 404 when passed an invalid article id to get comments", () => {
      return req
        .get("/api/articles/5bd31e1bc113b7adf623e2b8/comments")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
          expect(res.body).to.not.equal({ msg: "You made a bad request" });
          expect(res.body).to.not.equal({
            votes: 7,
            created_at: "2017-07-26T06:42:10.835Z",
            _id: "5bd95bacf723230097b8a5f2",
            body:
              "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.",
            belongs_to: "5bd95bacf723230097b8a5ee",
            created_by: {
              _id: "5bd95bacf723230097b8a5ed",
              username: "dedekind561",
              name: "mitch",
              avatar_url:
                "https://carboncostume.com/wordpress/wp-content/uploads/2017/10/dale-chipanddalerescuerangers.jpg",
              __v: 0
            },
            __v: 0
          });
        });
    });
    it("returns a status of 404 when passed an comment id", () => {
      return req
        .get("/api/comments/6bd5f6806f11fb430b789ff4")
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: "page not found" });
          expect(res.body).to.be.an("object");
          expect(res.body).to.not.equal(topics[1].slug);
          expect(res.body).to.not.equal({
            comment: {
              votes: 7,
              created_at: "2017-07-26T06:42:10.835Z",
              _id: "5bd8b855c43542cb5df9c08b",
              body:
                "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.",
              belongs_to: "5bd8b855c43542cb5df9c087",
              created_by: {
                _id: "5bd8b855c43542cb5df9c086",
                username: "dedekind561",
                name: "mitch",
                avatar_url:
                  "https://carboncostume.com/wordpress/wp-content/uploads/2017/10/dale-chipanddalerescuerangers.jpg",
                __v: 0
              },
              __v: 0
            }
          });
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
  describe("status 400", () => {
    it("returns a status of 400 when passed an invalid comment id", () => {
      return req
        .get("/api/comments/nathan")
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({
            msg: "You made a bad request"
          });
          expect(res.body).to.not.eql({ msg: "page not found" });
        });
    });
    it("returns a status of 400 when passed an invalid article id", () => {
      return req
        .get("/api/articles/nathan")
        .expect(400)
        .then(res => {
          expect(res.body).to.eql({
            msg: "You made a bad request"
          });
          expect(res.body).to.not.eql({ msg: "page not found" });
        });
    });
  });
});
