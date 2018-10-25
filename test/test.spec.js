process.env.NODE_ENV = "test";

const { expect } = require("chai");
const app = require("../app");
const req = require("supertest")(app);
const mongoose = require("mongoose");
const { topics, users, articles, comments } = require("../seed/testData");
const seedDB = require("../seed/seed");

describe("/api", () => {
  let articleDocs, topicDocs, commentDocs, userDocs;
  // beforeEach
  // After
  // Before
  beforeEach(() => {
    return seedDB({ topics, users, articles, comments }).then(docs => {
      [articleDocs, topicDocs, commentDocs, userDocs];
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/articles", () => {
    it("Get returns a status 200 and an array of articles", () => {
      return req
        .get("/api")
        .expect(200)
        .then(res => {
          console.log(res.body.articles);
        });
    });
  });

  describe("/articles/:articleId", () => {
    it("GET returns 200 and the requested article", () => {
      return req
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article.title).to.equal(articleDocs[0].title);
          expect(res.body.article._id).to.equal(`${articleDocs[0]._id}`);
        });
    });
    it("Get Returns a 404 for a non existing article :id", () => {
      return req
        .get("/api/   need a fake mongo Id here")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("article not found");
        });
    });
  });
});
