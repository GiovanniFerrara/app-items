module.exports = (id) => ({
  TableName: process.env.DYNAMODB_TABLE,
  IndexName: 'username-key',
  KeyConditionExpression: 'username = :v1',
  Select: 'ALL_ATTRIBUTES',
  ExpressionAttributeValues: {
    ':v1': {
      S: id
    }
  }
})
