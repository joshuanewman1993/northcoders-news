###NorthCoders News

list of all the end points that can be used in this app
GET /api
# Serves an HTML page with documentation for all the available endpoints
Below is a list of end points releated to each topic
Get /api/topics

returns all of topics

Get /api/topics/:slug

returns one individual topic

GET /api/topics/:topic_slug/articles

# return all the articles for a certain topic # e.g: `/api/topics/football/articles`

POST /api/topics/:topic_slug/articles

# Add a new article to a topic. This route requires a JSON body with title and body key value pairs 
# e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`

GET /api/articles/:article_id/comments

# Get all the comments for a individual article

Below is a list of end points releated to each article
GET /api/articles

# Returns all the articles

GET /api/articles/:article_id

# Get an individual article

POST /api/articles/:article_id/comments

# Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs 
# e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`

Below is a list of end points releated to each comment
Get /api/comments

returns all the comments

Get /api/comments/:comment_id

#returns one individual comment

Post /api/comments/:comment_id

#create's a new comment

DELETE /api/comments/:comment_id

# Deletes a comment

Below is a list of end points releated to each user
Get /api/users

returns all the users

Get /api/users/:username

returns one individual user

Post /api/users/:username

#create a new user

Delete /api/users/:username

#delete a user
