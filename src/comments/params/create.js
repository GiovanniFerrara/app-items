module.exports = ({
  id,
  createdAt,
  itemId,
  images,
  avatar,
  content,
  userId,
  username
}) => {
  const comment = {
    id,
    createdAt,
    itemId,
    images,
    avatar,
    content,
    userId,
    username
  }

  const params = {
    UpdateExpression: 'SET comments = list_append(comments, :comment)',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ConditionExpression: '#id = :id',
    ExpressionAttributeValues: {
      ':id': itemId,
      ':comment': [comment]
    },
    Key: { id: itemId },
    TableName: process.env.DYNAMODB_TABLE,
    ReturnValues: 'ALL_NEW'

  }
  return params
}
