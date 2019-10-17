const validator = require('validator')
const STATUS = require('../types/status')
const SITE = require('../types/site')
const TypedError = require('error/typed')

const InvalidType = (data) => TypedError({
  type: 'Item.invalid_data',
  message: `Invalid type for: ${data}`
})

const MissingFields = (fields, type) => TypedError({
  type: type || 'Item.missing_required_fields',
  message: `${fields.join(', ')} ${fields.length > 0 ? 'fields' : 'field'} required`
})

module.exports = ({
  id,
  location,
  status,
  creatorId,
  creatorName,
  createdAt,
  assets,
  categories,
  comments,
  stars,
  site,
  relevancy
}) => {
  const errorsObj = {}
  let validItem = null

  if (!validator.isUUID(id)) {
    errorsObj.id = MissingFields('Id')
  }
  if (!location.trim()) {
    errorsObj.location = MissingFields('Location')
  }
  if (!STATUS[status]) {
    errorsObj.status = InvalidType('Status')
  }
  if (!createdAt) {
    errorsObj.createdAt = MissingFields('Timestamp')
  }
  if (!validator.isUUID(creatorId)) {
    errorsObj.creatorId = MissingFields('Creator Id')
  }
  if (!creatorName.trim()) {
    errorsObj.creatorName = MissingFields('Creator username')
  }
  if (!assets.length) {
    errorsObj.assets = MissingFields('At least one image')
  }
  if (!categories.length) {
    errorsObj.categories = MissingFields('At least one category')
  }
  if (comments && !Array.isArray(comments)) {
    errorsObj.comments = InvalidType('Comments')
  }
  if (stars && !validator.isNumeric(stars)) {
    errorsObj.stars = InvalidType('Stars')
  }
  if (site && !SITE[site]) {
    errorsObj.stars = InvalidType('Site')
  }
  if (relevancy && !validator.isNumeric(relevancy)) {
    errorsObj.relevancy = InvalidType('relevancy')
  }

  const errCount = Object.keys(errorsObj).length
  const isValid = !errCount

  if (isValid) {
    validItem = {
      id,
      location,
      status,
      creatorId,
      creatorName,
      createdAt,
      assets,
      categories,
      comments,
      stars,
      site,
      relevancy
    }
  }
  return { isValid, validItem, errorsObj }
}
