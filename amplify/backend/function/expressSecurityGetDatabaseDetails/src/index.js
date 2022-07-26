"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const response = { ...event };
  const documentClient = new AWS.DynamoDB();
  const params = {
    TableName: process.env.STORAGE_DATABASE_NAME,
  };

  try {
    const data = await documentClient.describeTable(params).promise();
    const tableSize = data.Table.TableSizeBytes;
    response.performance_metrics["tableSize"] = {
      title: "Database Capacity",
      amount: parseFloat((tableSize / 1000).toFixed(2)),
    };
    callback(null, { ...response });
  } catch (err) {
    callback(err);
  }
};