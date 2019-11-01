module.exports = ({ chunkSize, lastItemId, status, location }) => {
  return ({
    TableName: process.env.DYNAMODB_TABLE,
    Limit: chunkSize,
    ExclusiveStartKey: lastItemId ? {
      id: lastItemId
    } : undefined,
    KeyConditionExpression: '#locstat = :param',
    ExpressionAttributeValues: {
      ':param': `${location.toLowerCase()}-${status}`
    },
    ExpressionAttributeNames: {
      '#locstat': 'location-status'
    },
    IndexName: 'location-status-index'
  })
}
