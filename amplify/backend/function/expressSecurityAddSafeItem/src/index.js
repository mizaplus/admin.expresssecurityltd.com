const AWS = require("aws-sdk");
const KSUID = require("ksuid");
const crypto = require("crypto");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  const date = Date.now();
  const payload = crypto.randomBytes(16);
  const code = KSUID.fromParts(date, payload);

  try {
    await db
      .put({
        TableName: process.env.STORAGE_DATABASE_NAME,
        Item: {
          PK: "SAFE-KEEPING",
          SK: `ITEM#${code.string}`,
          depositor_name: event.depositor_name,
          date_deposited: event.date_deposited,
          goods: event.goods,
          quantity: event.quantity,
          daily_cost: event.daily_cost,
          total_cost: event.total_cost,
        },
        ConditionExpression: "attribute_not_exists(SK)",
      })
      .promise();
    return {
      statusCode: 200,
      body: { message: "Item Saved Successfully.", code: code.string },
    };
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: "Safe Keeping Code exists, try again",
      };
    } else {
      return {
        statusCode: 404,
        body: error.message,
      };
    }
  }
};
