const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')
const uuid = require('uuid')

const create = (db) => async (item) => {
  return new Promise((resolve, reject) => {
    const id = uuid()
    item.id = id
    item.createdAt = new Date().toISOString()
    const { validItem, isValid, errorsObj } = validate.itemCreate(item)
    if (!isValid) {
      reject(errors.ValidationFailed(errorsObj))
    }
    db.put(params.putItem(validItem), (err) => {
      if (err) {
        return reject(errors.DataBaseError(err))
      }
      resolve(validItem)
    })
  })
}

module.exports = create