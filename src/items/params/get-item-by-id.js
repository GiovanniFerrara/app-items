module.exports = (id) => ({
  Key: {
    id: {
      S: id
    }
  },
  TableName: process.env.DYNAMODB_TABLE
})
