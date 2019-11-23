const errors = require('../../errors')
const statusTypes = require('../types/status')
const validator = require('validator')

module.exports = ({ location, status, isAdmin }) => {
  let error = null

  if (!isAdmin && (!location || !location.trim() || !validator.isAlphanumeric(location))) {
    error = errors.BadRequest()
  }

  if (!isAdmin && (!status || !statusTypes[status])) {
    error = errors.BadRequest()
  }

  return error
}
