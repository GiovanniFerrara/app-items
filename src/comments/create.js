// const validate = require('./validation')
const params = require('./params')
// const errors = require('./errors')
const uuid = require('uuid')

const create = (db) => async (item) => {
  return new Promise((resolve, reject) => {
    const id = uuid()
    item.id = id
    item.createdAt = new Date().toISOString()
    // const { validItem, isValid, errorsObj } = validate.create(item)
    // if (!isValid) {
    //   reject(errors.ValidationFailed(errorsObj))
    // }
    db.update(params.create(item), (err) => {
      if (err) {
        console.log(err)
        // return reject(errors.DataBaseError(err))
      }
      resolve(item)
    })
  })
}

module.exports = create
