module.exports = ({
  id,
  updatedAt,
  assets,
  categories,
  site
}) => {
  const params = {
    UpdateExpression: 'SET #updatedAt = :updatedAt, #assets = :assets, #categories = :categories, #site = :site',
    ExpressionAttributeNames: {
      '#updatedAt': 'updatedAt',
      '#assets': 'assets',
      '#categories': 'categories',
      '#site': 'site'

    },
    ExpressionAttributeValues: {
      ':updatedAt': updatedAt,
      ':assets': assets,
      ':categories': categories,
      ':site': site
    },
    Key: { id },
    TableName: process.env.DYNAMODB_TABLE,
    ReturnValues: 'ALL_NEW'

  }
  return params
}
