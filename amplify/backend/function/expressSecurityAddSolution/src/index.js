const AWS = require("aws-sdk");
const { generatePath, generateDate } = require("/opt/nodejs/index.js");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  try {
    await db
      .put({
        TableName: process.env.STORAGE_DATABASE_NAME,
        Item: {
          PK: "SOLUTIONS",
          SK: `ITEM#${generatePath(event.heading)}`,
          heading: event.heading,
          description: event.description,
          details: event.details,
          metaTitle: event.metaTitle,
          metaDesc: event.metaDesc,
          time: generateDate().time,
          date: generateDate().date,
          image: event.image,
        },
        ConditionExpression: "attribute_not_exists(SK)",
      })
      .promise();
    return {
      statusCode: 200,
      body: "Service Published Successfully",
    };
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: "Service exists, try again",
      };
    } else {
      return {
        statusCode: 404,
        body: error.message,
      };
    }
  }
};
