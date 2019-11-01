const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')

const getOne = (db) => async (id) => {
  return new Promise((resolve, reject) => {
    const err = validate.validId(id)
    if (err) {
      reject(err)
    }
    db.getItem(params.getOne).Promise()
      .then((data) => {
        return data
      })
      .catch((e) => {
        reject(errors.NotFound())
      })
  })
}

module.exports = getOne
