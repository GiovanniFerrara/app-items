module.exports = ({ key, value }) => {
  return {
    ExpressionAttributeValues: {
      ':value': {
        S: value
      }
    },
    FilterExpression: `${key} = :value`,
    TableName: process.env.DYNAMODB_TABLE
  }
}
