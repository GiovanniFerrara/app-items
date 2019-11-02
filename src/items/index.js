const create = require('./create')
const edit = require('./edit')
const getOne = require('./get-one')
const getAll = require('./get-all')
const getByLocationStatus = require('./get-by-location-status')

const Item = (db) => ({
  create: create(db),
  getOne: getOne(db),
  getAll: getAll(db),
  getByLocationStatus: getByLocationStatus(db),
  edit: edit(db)
})

module.exports = Item
