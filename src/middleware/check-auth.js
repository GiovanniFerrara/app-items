const User = require('../services/users')
const errors = require('../errors')

module.exports = async (req, res, next) => {
  const bearerToken = req.headers['x-authorization']
  if (bearerToken) {
    const token = bearerToken.replace('Bearer ', '')
    try {
      const userPayload = await User.getIdentity(token)
      const { username, id, isAdmin } = userPayload.data
      req.user = { username, id, isAdmin }
      next()
    } catch (err) {
      res.status(errors.Unauthorized(err).statusCode).send({ error: errors.Unauthorized(err).message })
    }
  } else {
    res.status(errors.Unauthorized('Missing token in headers').statusCode).send({ error: errors.Unauthorized('Missing token in headers').message })
  }
}
