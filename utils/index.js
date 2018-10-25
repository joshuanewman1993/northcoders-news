const formatArticle = (articleData, userDocs) => {
  // console.log(articleData);
  // console.log(userDocs);
  // I need to bring in the user docs so that i have access to the user name so that it
  // can be used below
  return articleData.map(article => ({
    ...article,
    // we use the spread operation here so that we can bring all the information related
    // to the article without having to type out each individual element like i have down below.
    belongs_to: article.topic,
    // I bring in the user docs here so that I can get the information i need
    //to then format the article so that it has the related information for each user
    // and article
    created_by: userDocs.find(user => article.created_by === user.username)._id
  }));
};

const formatComments = (commentData, userDocs, articleDocs) => {
  return commentData.map(comments => ({
    ...comments,
    belongs_to: articleDocs.find(
      article => article.title === comments.belongs_to
    )._id,
    created_by: userDocs.find(user => user.username === comments.created_by)._id
  }));
  // ...comments,
  // belongs_to: comments.article
};

module.exports = { formatArticle, formatComments };
