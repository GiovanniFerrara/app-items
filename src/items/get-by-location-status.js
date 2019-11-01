const validate = require('./validation')
const params = require('./params')
const errors = require('./errors')
const types = require('./types/status')

const getByLocationStatus = (db) => async ({ chunkSize = '20', lastItemId, location, status = types.AVAILABLE }) => {
  return new Promise((resolve, reject) => {
    const pagErr = validate.pagination({ chunkSize, lastItemId })
    const paramsErr = validate.locationStatus({ location, status })
    const err = pagErr || paramsErr
    if (err) {
      return reject(err)
    }
    db.query(params.getByLocationStatus({ chunkSize: chunkSize, lastItemId, location, status })).promise()
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

module.exports = getByLocationStatus
