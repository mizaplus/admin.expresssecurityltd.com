const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    dashboard: {
      TableName: process.env.STORAGE_DATABASE_NAME,
      KeyConditionExpression: "PK = :PK",
      ExpressionAttributeValues: {
        ":PK": "DASHBOARD",
      },
      ScanIndexForward: false,
    },
    auth: {
      TableName: process.env.STORAGE_DATABASE_NAME,
      KeyConditionExpression: "PK = :PK",
      ExpressionAttributeValues: {
        ":PK": "LOGIN-ACTIVITY",
      },
      ScanIndexForward: true,
      Limit: 14,
    },
  };

  try {
    const data = await documentClient.query(params.dashboard).promise();
    const auths = await documentClient.query(params.auth).promise();
    const overall_performance = data.Items.filter((item) =>
      item.SK.includes("PERFORMANCE")
    )[0];
    const db = [...data.Items]
      .filter((item) => item.SK.includes("DATABASE"))
      .sort((a, b) => {
        if (a.expiresIn > b.expiresIn) {
          return -1;
        } else {
          return 1;
        }
      });
    let db_data = {
      weekly: [...db]
        .splice(0, 7)
        .reverse()
        .map(({ date, performance }) => {
          return {
            performance,
            date: date,
          };
        }),
      biWeekly: [...db]
        .splice(0, 14)
        .map(({ date, performance }) => {
          return {
            performance,
            date: date,
          };
        })
        .reverse(),
    };

    const response = {
      performance: {
        metrics: overall_performance.performance_metrics,
        date: overall_performance.date,
      },
      database: { ...db_data },
      authentication: auths.Items.reverse(),
    };
    return {
      statusCode: 200,
      body: response,
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: error.message,
    };
  }
};