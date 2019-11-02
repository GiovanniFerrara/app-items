const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')

const edit = (db) => async ({ item, user }) => {
  return new Promise((resolve, reject) => {
    if (item.creatorId !== user.id && !user.isAdmin) {
      reject(errors.Unauthorized('Request from a wrong user'))
    }

    item.updatedAt = new Date().toISOString()
    const { validItem, isValid, errorsObj } = validate.edit(item)
    if (!isValid) {
      reject(errors.ValidationFailed(errorsObj))
    }
    db.update(params.edit(validItem)).promise()
      .then((editedItem) => {
        resolve(editedItem.Attributes)
      })
      .catch((err) => {
        return reject(errors.DataBaseError(err))
      })
  })
}

module.exports = edit
