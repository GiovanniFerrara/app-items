const axios = require('axios')
const baseUrl = process.env.USERS_URL

module.exports = class User {
  static async getIdentity (token) {
    try {
      const userPayload = await axios.post(`${baseUrl}/identity`, { token })
      return userPayload
    } catch (err) {
      Promise.reject(err)
    }
  }
}
