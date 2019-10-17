const create = require('./create')
const Item = (db) => ({ create: create(db) })

module.exports = Item
