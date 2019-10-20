
const scanParams = {
  TableName: process.env.DYNAMODB_TABLE
}

module.exports = (db) => {
  return new Promise((resolve, reject) => {
    db.scan(scanParams, (err, data) => {
      if (err) reject(err)
      else {
        data.Items.forEach((doc) => {
          const params = {
            TableName: scanParams.TableName,
            Key: { id: doc.id }
          }

          db.delete(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
          })
        })
      }
    })
  })
}
