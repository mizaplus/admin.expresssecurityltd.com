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
          SK: `CATEGORY#${generatePath(event.category_name)}`,
          category_name: event.category_name,
          metaTitle: event.metaTitle,
          metaDesc: event.metaDesc,
          image: event.image,
          tagline: event.tagline,
          date: generateDate().date,
          time: generateDate().time,
        },
        ConditionExpression: "attribute_not_exists(SK)",
      })
      .promise();
    return {
      statusCode: 200,
      body: "Category Saved Successfully.",
    };
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: "Category exists, try again",
      };
    } else {
      return {
        statusCode: 404,
        body: error.message,
      };
    }
  }
};
