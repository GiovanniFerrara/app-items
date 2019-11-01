const create = require('./create')
const getOne = require('./get-one')
const getAll = require('./get-all')
const getByLocationStatus = require('./get-by-location-status')

const Item = (db) => ({ create: create(db), getOne: getOne(db), getAll: getAll(db), getByLocationStatus: getByLocationStatus(db) })

module.exports = Item
