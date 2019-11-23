const validate = require('./validation/comment')
const params = require('./params')
const errors = require('../errors')
const uuid = require('uuid')

const create = (db) => async (item) => {
  return new Promise((resolve, reject) => {
    const id = uuid()
    item.id = id
    item.createdAt = new Date().toISOString()
    const { validItem, isValid, errorsObj } = validate(item)
    if (!isValid) {
      reject(errors.ValidationFailed(errorsObj))
    }
    db.update(params.create(validItem), (err) => {
      if (err) {
        return reject(errors.DataBaseError(err))
      }
      resolve(item)
    })
  })
}

module.exports = create
