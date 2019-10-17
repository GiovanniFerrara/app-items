const addOptionalProperties = require('../../utils/add-optional-properties')
const STATUS = require('../types/status')

module.exports = ({
  id,
  location,
  status = STATUS.AVAILABLE,
  creatorId,
  creatorName,
  createdAt,
  assets = [],
  categories = [],
  comments,
  stars = 0,
  site,
  relevancy = 0
}) => {
  const params = {
    Item: {
      id: { S: id },
      creatorId: { S: creatorId },
      creatorName: { S: creatorName },
      'location-status': { S: `${location}-${status}` },
      location: { S: location },
      status: { S: status },
      createdAt: { S: createdAt },
      assets: { L: assets },
      categories: { L: categories },
      stars: { N: stars },
      relevancy: { N: relevancy },
      ...addOptionalProperties(
        { comments, type: 'L' },
        { site, type: 'S' })
    },
    TableName: process.env.DYNAMODB_TABLE
  }
  return params
}
