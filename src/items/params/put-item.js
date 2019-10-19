const addOptionalProperties = require('../../utils/add-optional-properties')
const STATUS = require('../types/status')

module.exports = ({
  id,
  location,
  status = STATUS.AVAILABLE,
  creatorId,
  creatorName,
  createdAt,
  assets,
  categories,
  stars = 0,
  relevancy = 0,
  comments,
  site
}) => {
  const params = {
    Item: {
      id,
      location,
      status,
      creatorId,
      creatorName,
      createdAt,
      assets,
      categories,
      site,
      relevancy,
      stars,
      ...addOptionalProperties([
        comments,
        site
      ])
    },
    TableName: process.env.DYNAMODB_TABLE
  }
  return params
}
