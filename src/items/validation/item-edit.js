const validator = require('validator')
const STATUS = require('../types/status')
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
  location,
  status,
  creatorId,
  creatorName,
  updatedAt,
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
    errorsObj.id = MissingField('Id')
  }
  if (!location || !location.trim()) {
    errorsObj.location = MissingField('Location')
  }
  if (!STATUS[status]) {
    errorsObj.status = InvalidType('Status')
  }
  if (!updatedAt) {
    errorsObj.updatedAt = MissingField('Timestamp')
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
      updatedAt,
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
