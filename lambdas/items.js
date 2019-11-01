const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const ItemsConfig = require('../src/items')
const db = require('../src/db')
const middleware = require('../src/middleware')
const app = express()

// User middleware to authenticate requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middleware.checkAuth)

// pass db instance to unser model
const Item = ItemsConfig(db)

// post a new Item
app.post('/item', async (req, res) => {
  try {
    const newItem = req.body
    newItem.creatorId = req.user.id
    newItem.creatorName = req.user.username
    const itemCreated = await Item.create(newItem)
    res.json(itemCreated)
  } catch (err) {
    console.log(err)

    res.status(err.statusCode).json({ error: err.message, type: err.type, errorFields: err.errors })
  }
})
// get an item
app.get('/item/:id', async (req, res) => {
  try {
    const item = await Item.getOne(req.params.id)
    res.json(item)
  } catch (err) {
    console.log(err)

    res.status(err.statusCode).json({ error: err.message, type: err.type })
  }
})

// get a all the items if admin or for in specific location-status
app.get('/item', async (req, res) => {
  try {
    const { chunkSize, lastItemId, location, status } = req.query
    if (req.user.idAdmin && !req.query.location) {
      const items = await Item.getAll({ chunkSize, lastItemId, location })
      return res.json(items)
    }

    const items = await Item.getByLocationStatus({ chunkSize, lastItemId, location, status })
    res.json(items)
  } catch (err) {
    console.log(err)

    res.status(err.statusCode).json({ error: err.message, type: err.type })
  }
})

process.env.IS_LOCAL_ENV && app.listen(3000, () => console.log(`Server listening on: 3000, env: ${process.env.DYNAMODB_TABLE}`))

module.exports.handler = serverless(app)
