module.exports = (id) => ({
  Key: {
    id
  },
  TableName: process.env.DYNAMODB_TABLE
})
