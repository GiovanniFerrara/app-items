const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      return done(null, jwtPayload)
    })
  )
}
