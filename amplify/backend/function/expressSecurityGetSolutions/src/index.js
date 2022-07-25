const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient();
  try {
    const { Items } = await db
      .query({
        TableName: process.env.STORAGE_DATABASE_NAME,
        KeyConditionExpression: "PK = :PK",
        ExpressionAttributeValues: {
          ":PK": "SOLUTIONS",
        },
      })
      .promise();
    const payload = {
      welcome: Items.filter((item) => item.SK === "WELCOME")[0],
      solutions: !event.minimal
        ? Items.filter((item) => item.SK.includes("ITEM#"))
        : Items.filter((item) => item.SK.includes("ITEM#")).map((item) => ({
            id: item.SK.split("#")[1],
            heading: item.category_name,
            description: item.description,
            image: item.image,
            icon: item.icon,
          })),
    };
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
