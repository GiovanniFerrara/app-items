const TypedError = require('error/typed')

const MissingFields = (fields, type) => TypedError({
  type: type || 'Item.missing_required_fields',
  message: `${fields.join(', ')} ${fields.length > 0 ? 'fields' : 'field'} required`,
  statusCode: 400
})

const DataBaseError = (err) => TypedError({
  type: 'User.query_error',
  message: 'There was a problem with the database: ',
  debug: err,
  statusCode: 500
})

const AuthError = (err) => TypedError({
  type: 'User.auth_error',
  message: 'There was a problem with the authentication, try again',
  debug: err,
  statusCode: 500
})

const Unauthorized = (err) => TypedError({
  type: 'Item.Unauthorized',
  message: 'This action requires authentication, login again.',
  debug: err,
  statusCode: 401
})

const ValidationFailed = (errors) => TypedError({
  type: 'Item.invalid_data',
  message: 'Invalid data provided',
  errors,
  statusCode: 400
})

const BadRequest = () => TypedError({
  type: 'Item.bad_request',
  message: 'This item(s) doesn\'t exist.',
  statusCode: 404
})

const NotFound = () => TypedError({
  type: 'Item.not_found',
  message: 'Item not found.',
  statusCode: 404
})

module.exports = { MissingFields, DataBaseError, AuthError, Unauthorized, ValidationFailed, BadRequest, NotFound }
