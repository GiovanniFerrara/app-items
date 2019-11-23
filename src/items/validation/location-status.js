const errors = require('../../errors')
const statusTypes = require('../types/status')
const validator = require('validator')

module.exports = ({ location, status }) => {
  let error = null

  if (!location || !location.trim() || !validator.isAlphanumeric(location)) {
    error = errors.BadRequest()
  }

  if (!status || !statusTypes[status]) {
    error = errors.BadRequest()
  }

  return error
}
