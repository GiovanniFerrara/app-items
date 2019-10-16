const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const ItemsConfig = require('../src/items')
const db = require('../src/db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// pass db instance to unser model
const Item = ItemsConfig(db)

// Routes

app.post('/user/new', async (req, res) => {
  try {
    // coming soon
  } catch (err) {
    console.log(err)

    res.status(err.statusCode).json({ error: err.message })
  }
})

process.env.IS_LOCAL_ENV && app.listen(4000, () => console.log(`Server listening on: 4000, env: ${process.env.DYNAMODB_TABLE}`))

module.exports.handler = serverless(app)
