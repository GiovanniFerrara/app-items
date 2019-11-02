const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')

const getOne = (db) => async (id) => {
  return new Promise((resolve, reject) => {
    const err = validate.validId(id)
    if (err) {
      reject(err)
    }
    db.get(params.getOne(id)).promise()
      .then((data) => {
        resolve(data.Item)
      })
      .catch((e) => {
        reject(errors.NotFound(e))
      })
  })
}

module.exports = getOne
