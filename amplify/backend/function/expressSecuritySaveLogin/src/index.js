"use strict";
const AWS = require("aws-sdk");
const { generateDate, months } = require("/opt/nodejs/index.js");

exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const userData = event.request.userAttributes;

  const params = {
    TableName: process.env.STORAGE_DATABASE_NAME,
    Item: {
      PK: "LOGIN-ACTIVITY",
      SK: `ACTIVITY#${new Date().getFullYear()}#${
        months[new Date().getMonth()]
      }#${new Date().getDate()}#${(Math.random() * 10000).toFixed(0)}`,
      name: event.userName,
      contact: userData.phone_number,
      accountStatus: userData["cognito:user_status"],
      email: userData.email,
      emailStatus: userData.email_verified,
      time: generateDate().time,
      date: generateDate().date,
      expiry: new Date().getTime() + 2678000000,
    },
  };
  try {
    await documentClient.put(params).promise();
    return {
      ...event,
    };
  } catch (err) {
    return {
      ...event,
    };
  }
};
