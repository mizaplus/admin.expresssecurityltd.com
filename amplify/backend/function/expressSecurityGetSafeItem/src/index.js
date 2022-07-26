const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  try {
    const { Item } = await db
      .get({
        TableName: process.env.STORAGE_DATABASE_NAME,
        Key: {
          PK: "SAFE-KEEPING",
          SK: `ITEM#${event.code}`,
        },
      })
      .promise();
    return {
      statusCode: 200,
      body: Item,
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: error.message,
    };
  }
};
