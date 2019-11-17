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
  site,
  description,
  localization
}) => {
  const params = {
    Item: {
      id,
      location,
      localization,
      'location-status': `${location}-${status}`,
      status,
      creatorId,
      creatorName,
      createdAt,
      updatedAt: createdAt,
      assets,
      categories,
      site,
      relevancy,
      stars,
      comments: [],
      ...addOptionalProperties([
        site,
        description
      ])
    },
    TableName: process.env.DYNAMODB_TABLE
  }
  return params
}
