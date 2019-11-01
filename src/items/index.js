const create = require('./create')
const getOne = require('./get-one')
const getAll = require('./get-all')
const Item = (db) => ({ create: create(db), getOne: getOne(db), getAll: getAll(db) })

module.exports = Item
