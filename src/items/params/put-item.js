const addOptionalProperties = require('../../utils/add-optional-properties')

module.exports = ({ id }) => {
  const requiredProperties = {
    id: {
      S: id
    }
  }
  const params = {
    Item: {
      ...requiredProperties,
      ...addOptionalProperties(null)
    },
    TableName: process.env.DYNAMODB_TABLE
  }
  return params
}
