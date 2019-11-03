module.exports = ({
  id,
  updatedAt,
  assets,
  categories,
  site,
  description,
  localization
}) => {
  const descriptionAttrName = description ? { '#description': 'description' } : {}
  const descriptionAttrVal = description ? { ':description': description } : {}
  const descriptionExpression = description ? ', #description = :description' : ''

  const params = {
    UpdateExpression: `SET #updatedAt = :updatedAt, #assets = :assets, #categories = :categories, #site = :site, #localization = :localization ${descriptionExpression}`,
    ExpressionAttributeNames: {
      '#updatedAt': 'updatedAt',
      '#assets': 'assets',
      '#categories': 'categories',
      '#site': 'site',
      '#id': 'id',
      '#localization': 'localization',
      ...descriptionAttrName
    },
    ConditionExpression: '#id = :id',
    ExpressionAttributeValues: {
      ':updatedAt': updatedAt,
      ':assets': assets,
      ':categories': categories,
      ':site': site,
      ':id': id,
      ':description': description,
      ':localization': localization,
      ...descriptionAttrVal
    },
    Key: { id },
    TableName: process.env.DYNAMODB_TABLE,
    ReturnValues: 'ALL_NEW'

  }
  return params
}
