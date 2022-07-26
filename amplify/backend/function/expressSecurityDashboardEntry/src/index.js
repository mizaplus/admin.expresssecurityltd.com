"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.STORAGE_DATABASE_NAME,
  };
  try {
    const data = await documentClient.scan(params).promise();
    let entry = {
      performance_metrics: {
        solutions: {
          title: "Solutions",
          amount: [...data.Items].filter(
            (item) => item.PK === "SOLUTIONS" && item.SK.includes("ITEM")
          ).length,
        },
        products: {
          title: "Products",
          amount: [...data.Items].filter(
            (item) => item.PK === "PRODUCTS" && item.SK.includes("ITEM")
          ).length,
        },
        authentication: {
          title: "Authentication",
          amount: [...data.Items].filter((item) => item.PK === "LOGIN-ACTIVITY")
            .length,
        },
      },
    };
    callback(null, entry);
  } catch (err) {
    callback(err);
  }
};