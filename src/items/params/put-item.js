const addOptionalProperties = require('../../utils/add-optional-properties')
const STATUS = require('../types/status')

module.exports = ({
  id,
  location,
  status = STATUS.AVAILABLE,
  creatorId,
  createdAt,
  assets = [],
  categories = [],
  comments,
  stars = 0,
  site,
  relevancy = 0
}) => {
  const requiredProperties = {
    id: { S: id },
    creatorId: creatorId,
    'location-status': { S: `${location}-${status}` },
    location: { S: location },
    status: { S: status },
    createdAt: { S: createdAt },
    assets: { L: assets },
    categories: { L: categories },
    stars: { N: stars },
    relevancy: { N: relevancy }
  }
  const params = {
    Item: {
      ...requiredProperties,
      ...addOptionalProperties(
        { comments, type: 'L' },
        { site, type: 'S' })
    },
    TableName: process.env.DYNAMODB_TABLE
  }
  return params
}
