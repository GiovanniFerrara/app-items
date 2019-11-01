const validator = require('validator')
const SITE = require('../types/site')

const InvalidType = (data) => ({
  type: 'Item.invalid_data',
  message: `Invalid type for: ${data}`
})

const MissingField = (field, type) => ({
  type: type || 'Item.missing_required_field',
  message: `${field} required`
})

module.exports = ({
  id = '',
  location,
  creatorId = '',
  creatorName,
  createdAt,
  assets,
  categories,
  site
}) => {
  const errorsObj = {}
  let validItem = null

  if (!validator.isUUID(id)) {
    errorsObj.id = MissingField('Id')
  }
  if (!location || !location.trim()) {
    errorsObj.location = MissingField('Location')
  }
  if (!createdAt) {
    errorsObj.createdAt = MissingField('Timestamp')
  }
  if (!validator.isUUID(creatorId)) {
    errorsObj.creatorId = MissingField('Creator Id')
  }
  if (!creatorName || !creatorName.trim()) {
    errorsObj.creatorName = MissingField('Creator username')
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
      location,
      creatorId,
      creatorName,
      createdAt,
      assets,
      categories,
      site
    }
  }
  return { isValid, validItem, errorsObj }
}
