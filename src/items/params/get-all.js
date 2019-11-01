module.exports = ({ chunkSize, lastItemId }) => ({
  TableName: process.env.DYNAMODB_TABLE,
  Limit: chunkSize,
  ExclusiveStartKey: lastItemId ? {
    id: lastItemId
  } : undefined
})
