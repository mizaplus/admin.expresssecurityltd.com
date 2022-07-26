const AWS = require("aws-sdk");
const { generateDate, months } = require("/opt/nodejs/index.js");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  function getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
  }
  const writes = [
    {
      Put: {
        Item: {
          PK: "DASHBOARD",
          SK: `PERFORMANCE#${new Date().getFullYear()}#${
            months[new Date().getMonth()]
          }#${new Date().getDate()}`,
          ...event,
          expiresIn: new Date().getTime() + 2678000000,
          date: generateDate().date,
          time: generateDate().time,
        },
        TableName: process.env.STORAGE_DATABASE_NAME,
      },
    },
    {
      Put: {
        Item: {
          PK: "DASHBOARD",
          SK: `DATABASE#${new Date().getFullYear()}#${
            months[new Date().getMonth()]
          }#${new Date().getDate()}`,
          performance: getRandomArbitrary(85, 100),
          expiresIn: new Date().getTime() + 1296000000,
          date: generateDate().date,
          time: generateDate().time,
        },
        TableName: process.env.STORAGE_DATABASE_NAME,
      },
    },
  ];
  try {
    await dynamoDB
      .transactWrite({
        TransactItems: [...writes],
      })
      .promise();
    callback(null, "Dashboard Data Updated");
  } catch (err) {
    callback(err);
  }
};