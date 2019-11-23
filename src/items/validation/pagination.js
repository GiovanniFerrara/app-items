const validator = require('validator')
const errors = require('../../errors')

module.exports = ({ chunkSize, lastItemId }) => {
  let error = null

  if (lastItemId && !validator.isUUID(lastItemId)) {
    error = errors.BadRequest()
  }

  if (chunkSize && !validator.isNumeric(chunkSize)) {
    error = errors.BadRequest()
  }

  return error
}
