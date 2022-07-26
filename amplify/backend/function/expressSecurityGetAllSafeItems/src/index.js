const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  try {
    const { Items } = await db
      .query({
        TableName: process.env.STORAGE_DATABASE_NAME,
        KeyConditionExpression: "PK = :PK and begins_with(SK,:SK)",
        ExpressionAttributeValues: {
          ":PK": "SAFE-KEEPING",
          ":SK": "ITEM",
        },
      })
      .promise();
    const payload = Items;
    return {
      statusCode: 200,
      body: payload,
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: error.message,
    };
  }
};
