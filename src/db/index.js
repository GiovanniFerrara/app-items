const AWS = require('aws-sdk')

module.exports = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08', region: 'eu-west-2' })
