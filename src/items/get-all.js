const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')

const getAll = (db) => async ({ chunkSize = '20', lastItemId }) => {
  return new Promise((resolve, reject) => {
    const err = validate.pagination({ chunkSize, lastItemId })
    if (err) {
      reject(err)
    }
    db.scan(params.getAll({ chunkSize: chunkSize, lastItemId })).promise()
      .then((data) => {
        const lastItemId = data.LastEvaluatedKey ? data.LastEvaluatedKey.id : null

        resolve({ items: data.Items, lastItemId })
      })
      .catch((e) => {
        console.log(e)
        reject(errors.NotFound(e))
      })
  })
}

module.exports = getAll
