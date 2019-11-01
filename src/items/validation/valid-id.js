const validator = require('validator')
const errors = require('../errors')

module.exports = (id) => {
  let error = null

  if (!validator.isUUID(id)) {
    error = errors.BadRequest()
  }
  return error
}
