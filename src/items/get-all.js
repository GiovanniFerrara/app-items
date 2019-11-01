const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')

const getAll = (db) => async ({ chunkSize, lastItemId }) => {
  return new Promise((resolve, reject) => {
    const err = validate.pagination({ chunkSize, lastItemId })
    if (err) {
      reject(err)
    }
    db.scan(params.getAll({ chunkSize, lastItemId })).promise()
      .then((data) => {
        resolve({ items: data.Items, lastItemId: data.LastEvaluatedKey })
      })
      .catch((e) => {
        console.log(e)
        reject(errors.NotFound(e))
      })
  })
}

module.exports = getAll
