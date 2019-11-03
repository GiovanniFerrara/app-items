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
  localization,
  creatorId = '',
  creatorName,
  createdAt,
  assets,
  categories,
  description,
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
  location = validator.escape(location)

  if (!createdAt) {
    errorsObj.createdAt = MissingField('Timestamp')
  }

  if (!validator.isISO8601(createdAt)) {
    errorsObj.localization = InvalidType('Timestamp')
  }

  if (!validator.isUUID(creatorId)) {
    errorsObj.creatorId = MissingField('Creator Id')
  }

  if (!creatorName || !creatorName.trim()) {
    errorsObj.creatorName = MissingField('Creator username')
  }
  creatorName = validator.escape(creatorName)

  if (!assets || !assets.length) {
    errorsObj.assets = MissingField('At least one image')
  }

  assets && assets.length && assets.forEach(ass => {
    if (!ass.name || !ass.link) {
      errorsObj.assets = InvalidType('Image type')
      return
    }
    ass.name = validator.escape(ass.name)
    ass.link = validator.escape(ass.link)
  })

  if (!categories || !categories.length) {
    errorsObj.categories = MissingField('At least one category')
  }

  categories && categories.length && categories.forEach(cat => {
    if (!cat.id || !cat.name) {
      errorsObj.categories = InvalidType('Category')
      return
    }
    validator.escape(cat.name)
  })

  if (!localization || (!localization.lat || !localization.lng) || (!localization.lat.trim() || !localization.lng.trim())) {
    errorsObj.localization = MissingField('Localization')
  }

  if (localization && ((localization.lat && !validator.isNumeric(localization.lat)) || (localization.lng && !validator.isNumeric(localization.lng)))) {
    errorsObj.localization = InvalidType('Localization')
  }

  if (site && !SITE[site]) {
    errorsObj.stars = InvalidType('Site')
  }
  if (description && (!description.trim().length() > 8)) {
    errorsObj.stars = InvalidType('Description (optional field), it should contain at least 8 chars')
  }
  if (description) {
    description = validator.escape(description)
  }

  const errCount = Object.keys(errorsObj).length
  const isValid = !errCount

  if (isValid) {
    validItem = {
      id,
      location,
      localization,
      description,
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
