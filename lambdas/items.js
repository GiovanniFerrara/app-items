const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const ItemsConfig = require('../src/items')
const db = require('../src/db')
const middleware = require('../src/middleware')
const app = express()

// User middleware to authenticate requests
app.use(middleware.checkAuth)

// pass db instance to unser model
// const Item = ItemsConfig(db)

// Routes

app.get('/item', async (req, res) => {
  try {
    res.send(req.user)
  } catch (err) {
    console.log(err)

    res.status(err.statusCode).json({ error: err.message })
  }
})

process.env.IS_LOCAL_ENV && app.listen(3000, () => console.log(`Server listening on: 3000, env: ${process.env.DYNAMODB_TABLE}`))

module.exports.handler = serverless(app)
