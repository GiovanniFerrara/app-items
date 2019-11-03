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
  id,
  updatedAt,
  assets,
  categories,
  site,
  localization,
  description
}) => {
  const errorsObj = {}
  let validItem = null

  if (!id || !validator.isUUID(id)) {
    !id && (errorsObj.id = MissingField('Id'))
    !validator.isUUID(id) && (errorsObj.id = InvalidType('Id'))
  }

  if (!updatedAt) {
    errorsObj.updatedAt = MissingField('Timestamp')
  }

  if (!validator.isISO8601(updatedAt)) {
    errorsObj.updatedAt = InvalidType('Timestamp')
  }

  assets && assets.length && assets.forEach(ass => {
    if (!ass.name) {
      errorsObj.assets = InvalidType('Image type')
      return
    }
    ass.name = validator.escape(ass.name)
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
    errorsObj.site = InvalidType('Site')
  }

  if (description && ((description.length < 8) || (description.length > 200))) {
    errorsObj.description = InvalidType('Description (optional field), it should contain at least 8 chars')
  }

  if (description) {
    description = validator.escape(description)
  }

  const errCount = Object.keys(errorsObj).length
  const isValid = !errCount

  if (isValid) {
    validItem = {
      id,
      updatedAt,
      assets,
      categories,
      site,
      description,
      localization
    }
  }
  return { isValid, validItem, errorsObj }
}
