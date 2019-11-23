const validator = require('validator')

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
  itemId,
  createdAt,
  userId,
  username,
  content,
  images = [],
  respondsToCommentId,
  avatar,
  previousEdits
}) => {
  const errorsObj = {}
  let validItem = null

  if (!id || !validator.isUUID(id)) {
    errorsObj.id = MissingField('Id')
  }

  if (!itemId || !validator.isUUID(itemId)) {
    errorsObj.itemId = MissingField('itemId')
  }

  if (!createdAt) {
    errorsObj.createdAt = MissingField('Timestamp')
  }

  if (!userId || !validator.isUUID(userId)) {
    errorsObj.userId = MissingField('userId')
  }

  if (!username || !username.trim()) {
    errorsObj.username = MissingField('username')
  }

  if (!content || !content.trim()) {
    errorsObj.content = MissingField('content')
  }
  content && (content = validator.escape(content))

  if (!validator.isISO8601(createdAt)) {
    errorsObj.createdAt = InvalidType('Timestamp')
  }

  if (!images || !images.length) {
    errorsObj.images = MissingField('At least one image')
  }

  images && images.length && images.forEach(img => {
    if (!img.name) {
      errorsObj.images = InvalidType('Image type')
      return
    }
    img && (img.name = validator.escape(img.name))
  })

  if (!respondsToCommentId || !validator.isUUID(respondsToCommentId)) {
    errorsObj.respondsToCommentId = InvalidType('Comment id type')
  }

  if (previousEdits && !previousEdits.length) {
    errorsObj.previousEdits = InvalidType('PreviousEdits type')
  }

  previousEdits && previousEdits.length && previousEdits.forEach(edit => {
    if (!edit) {
      errorsObj.previousEdits = InvalidType('Edit type')
      return
    }
    edit && (edit = validator.escape(edit))
  })

  const errCount = Object.keys(errorsObj).length
  const isValid = !errCount

  if (isValid) {
    validItem = {
      id,
      itemId,
      createdAt,
      userId,
      username,
      content,
      images,
      respondsToCommentId,
      avatar,
      previousEdits
    }
  }
  return { isValid, validItem, errorsObj }
}
