const User = require('../services/users')
const errors = require('../items/errors')

module.exports = async (req, res, next) => {
  const bearerToken = req.headers['x-authorization']
  if (bearerToken) {
    const token = bearerToken.replace('Bearer ', '')
    try {
      const userPayload = await User.getIdentity(token)
      const { username, id, isAdmin } = userPayload.data
      req.user = { username, id, isAdmin }
    } catch (err) {
      res.status(errors.Unathorized(err).statusCode).send({ error: errors.Unathorized(err).message })
    }
  }
  next()
}
