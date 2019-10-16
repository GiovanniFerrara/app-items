const AWS = require('aws-sdk')

module.exports = new AWS.DynamoDB({ apiVersion: '2012-10-08', region: 'eu-west-2' })
