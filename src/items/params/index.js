const getItemById = require('./get-item-by-id')
const putItem = require('./put-item')
const queryByUsername = require('./query-by-username')
const scanBy = require('./scan-by')

module.exports = ({ putItem, scanBy, getItemById, queryByUsername })
