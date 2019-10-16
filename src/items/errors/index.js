const TypedError = require('error/typed')

const MissingFields = (fields) => TypedError({
  type: 'User.missing_required_fields',
  message: `${fields.join(', ')} are required`,
  statusCode: 400
})

const DataBaseError = (err) => TypedError({
  type: 'User.query_error',
  message: 'There was a problem with the database: ',
  debug: err,
  statusCode: 500
})

const QueryError = (err) => TypedError({
  type: 'User.query_error',
  message: 'Database error.',
  debug: err,
  statusCode: 500
})

const AuthError = (err) => TypedError({
  type: 'User.auth_error',
  message: 'There was a problem with the authentication, try again',
  debug: err,
  statusCode: 500
})

module.exports = { MissingFields, DataBaseError, QueryError, AuthError }
