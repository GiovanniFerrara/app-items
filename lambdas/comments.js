const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const CommentsConfig = require('../src/comments')
const db = require('../src/db')
const middleware = require('../src/middleware')
const app = express()

// User middleware to authenticate requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middleware.checkAuth)

// pass db instance to unser model
const Comment = CommentsConfig(db)

// post a new Item
app.post('/comment', async (req, res) => {
  try {
    const newItem = req.body
    newItem.userId = req.user.id
    newItem.username = req.user.username
    const itemCreated = await Comment.create(newItem)
    res.json(itemCreated)
  } catch (err) {
    console.log(err)

    res.status(err.statusCode).json({ error: err.message, type: err.type, errorFields: err.errors })
  }
})

process.env.IS_LOCAL_ENV && app.listen(3000, () => console.log(`Server listening on: 3000, env: ${process.env.DYNAMODB_TABLE}`))

module.exports.handler = serverless(app)
