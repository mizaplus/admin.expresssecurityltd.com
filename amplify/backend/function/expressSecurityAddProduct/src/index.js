const AWS = require("aws-sdk");
const { generatePath, generateDate } = require("/opt/nodejs/index.js");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  try {
    await db
      .put({
        TableName: process.env.STORAGE_DATABASE_NAME,
        Item: {
          PK: "PRODUCTS",
          SK: `ITEM#${generatePath(event.product_name)}`,
          product_name: event.product_name,
          category: event.category,
          description: event.description,
          metaTitle: event.metaTitle,
          metaDesc: event.metaDesc,
          image: event.image,
          details: event.details,
          date: generateDate().date,
          time: generateDate().time,
        },
        ConditionExpression: "attribute_not_exists(SK)",
      })
      .promise();
    return {
      statusCode: 200,
      body: "Product Saved Successfully.",
    };
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: "Product exists, try again",
      };
    } else {
      return {
        statusCode: 404,
        body: error.message,
      };
    }
  }
};
