const create = require('./create')
const getOne = require('./get-one')
const Item = (db) => ({ create: create(db), getone: getOne(db) })

module.exports = Item
