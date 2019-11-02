const validator = require('validator')
const SITE = require('../types/site')
// const TypedError = require('error/typed')

const InvalidType = (data) => ({
  type: 'Item.invalid_data',
  message: `Invalid type for: ${data}`
})

const MissingField = (field, type) => ({
  type: type || 'Item.missing_required_field',
  message: `${field} required`
})

module.exports = ({
  id,
  updatedAt,
  assets,
  categories,
  site
}) => {
  const errorsObj = {}
  let validItem = null

  if (!id || !validator.isUUID(id)) {
    !id && (errorsObj.location = MissingField('Id'))
    !validator.isUUID(id) && (errorsObj.id = InvalidType('Id'))
  }

  if (!updatedAt) {
    errorsObj.updatedAt = MissingField('Timestamp')
  }

  if (!assets || !assets.length) {
    errorsObj.assets = MissingField('At least one image')
  }
  if (!categories || !categories.length) {
    errorsObj.categories = MissingField('At least one category')
  }

  if (site && !SITE[site]) {
    errorsObj.stars = InvalidType('Site')
  }

  const errCount = Object.keys(errorsObj).length
  const isValid = !errCount

  if (isValid) {
    validItem = {
      id,
      updatedAt,
      assets,
      categories,
      site
    }
  }
  return { isValid, validItem, errorsObj }
}
